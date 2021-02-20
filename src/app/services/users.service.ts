import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user: AngularFireList<Usuario>;

  constructor(private db: AngularFireDatabase) {
    this.user  = this.db.list('/users', (ref) => ref.orderByChild('name'));
  }

  getUsers(): Observable<Usuario[]>{
    return this.user.snapshotChanges().pipe(
      map(changes =>{
        return changes.map( c => ({key: c.payload.key, ... c.payload.val()}));
      })
    );
  }

  addUser ( user: Usuario){
    return this.user.push(user);
  }

  deleteUser (id: string){
    this.db.list('/users').remove(id);
  }

  editUser( newUser){
    const $key = newUser.$key;
    delete(newUser.$key);
    this.db.list('/player').update($key, newUser);
  }

}
