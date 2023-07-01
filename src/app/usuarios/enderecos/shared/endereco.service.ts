import { Injectable } from '@angular/core';
import { FirebasePath } from './../../../core/shared/firebase-path';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {
  enderecosRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    const path = `${FirebasePath.USUARIOS_ENDERECOS}${this.afAuth.auth.currentUser.uid}`
    this.enderecosRef = this.db.list(path);
  }

  insert(endereco: any) {
    return this.save(endereco, null);
  }

  update(endereco: any, key: string) {
    return this.save(endereco, key);
  }

  private save(endereco: any, key: string) {
    return new Promise((resolve, reject) => {

      if (key) {
        this.enderecosRef.update(key, endereco)
          .then(() => resolve(key))
          .catch(() => reject());
      } else {
        this.enderecosRef.push(endereco)
          .then((result: any) => resolve(result.key));
      }
    });
  }

  getAll() {
    return this.enderecosRef.snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({ key: m.payload.key, ...m.payload.val() }))
      })
    )
  }

  getByKey(key: string) {
    const path = `${FirebasePath.USUARIOS_ENDERECOS}${this.afAuth.auth.currentUser.uid}/${key}`;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ key: change.key, ...change.payload.val() });
      })
    );
  }

  remove(key: string) {
    return this.enderecosRef.remove(key);
  }
}
