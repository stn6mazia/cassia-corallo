import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Store } from '../shared/store';


@Injectable({
  providedIn: 'root'
})
export class StoreService {


  private dbPath = '/store';
 
  storeRef: AngularFireList<Store> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.storeRef = db.list(this.dbPath);
  }
 
  createStore(store: Store): void {
    this.storeRef.push(store);
  }
 
  updateStore(key: string, value: any): Promise<void> {
    return this.storeRef.update(key, value);
  }
 
  deleteStore(key: string): Promise<void> {
    return this.storeRef.remove(key);
  }
 
  getStoresList(): AngularFireList<Store> {
    return this.storeRef;
  }
}
