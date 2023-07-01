import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebasePath } from './../../core/shared/firebase-path';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.categoriasRef = this.db.list(FirebasePath.CATEGORIAS);
  }

  insert(categoria: any) {
    return this.categoriasRef.push(categoria);
  }

  update(categoria: any, key: string) {
    let updateObj = {}
    updateObj[`${FirebasePath.CATEGORIAS}${key}`] = categoria;

    const subscribe = this.getProdutosByCategoria(key).subscribe(produtos => {
      subscribe.unsubscribe();

      produtos.forEach(produto => {
        updateObj[`${FirebasePath.PRODUTOS}${produto.key}/categoriaNome`] = categoria.nome;
      });

      this.db.object('/').update(updateObj);
    });
  }

  getByKey(key: string) {
    const path = `${FirebasePath.CATEGORIAS}${key}`;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
  }

  getAll() {
    return this.categoriasRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getProdutosByCategoria(key: string) {
    return this.db.list(FirebasePath.PRODUTOS, q => q.orderByChild('categoriaKey').equalTo(key))
    .snapshotChanges()
    .pipe(
      map(changes => {
        return changes.map(m => ({ key: m.key }))
      })
    )
  }

  remove(key: string) {
    return new Promise((resolve, reject) => {
      const subscribe = this.getProdutosByCategoria(key).subscribe((produtos: any) => {
        subscribe.unsubscribe();

        if (produtos.length == 0) {
          return this.categoriasRef.remove(key);
        } else {
          reject('Não é possível excluir a categoria pois ela tem produtos associados.')
        }
      });
    });
  }
}
