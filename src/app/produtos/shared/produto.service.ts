import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirebasePath } from './../../core/shared/firebase-path';
import { map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  produtosRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.produtosRef = this.db.list(FirebasePath.PRODUTOS);
  }

  insert(produto: any) {
    return this.save(produto, null);
  }

  update(produto: any, key: string) {
    return this.save(produto, key);
  }

  private save(produto: any, key: string) {
    return new Promise((resolve, reject) => {
      const produtoRef = {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        categoriaKey: produto.categoriaKey,
        categoriaNome: produto.categoriaNome,
      }

      if (key) {
        this.produtosRef.update(key, produtoRef)
          .then(() => resolve(key))
          .catch(() => reject());
      } else {
        this.produtosRef.push(produtoRef)
          .then((result: any) => resolve(result.key));
      }
    });
  }

  getByKey(key: string) {
    const path = `${FirebasePath.PRODUTOS}${key}`;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
  }

  getAll() {
    return this.produtosRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m =>  ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  remove(key: string, filePath: string) {
    this.produtosRef.remove(key);
    if (filePath) {
      this.removeImg(filePath, key, false);
    }
  }

  uploadImg(key: string, file: File) {
    const filePath = `${FirebasePath.PRODUTOS}${key}/${file.name}`;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe((url => {
          this.produtosRef.update(key, { img: url, filePath: filePath })
        }))
      })
    ).subscribe();
  }

  removeImg(filePath: string, key: string, atualizarProduto: boolean = true) {
    const ref = this.storage.ref(filePath);
    ref.delete();
    if (atualizarProduto) {
      this.produtosRef.update(key, { img: '', filePath: '' });
    }
  }
}
