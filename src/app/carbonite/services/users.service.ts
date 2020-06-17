import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../shared/product';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private dbPath = '/users';
 
  usersRef: AngularFireList<User> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
  }
 
  createUser(user: User): void {
    this.usersRef.push(user);
  }
 
  updateUser(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }
 
  deleteUser(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }
 
  getUsersList(): AngularFireList<User> {
    return this.usersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }
}
