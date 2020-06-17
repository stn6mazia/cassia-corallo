import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Order } from '../shared/order';


@Injectable({
  providedIn: 'root'
})
export class ordersService {


  private dbPath = '/orders';
 
  ordersRef: AngularFireList<Order> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.ordersRef = db.list(this.dbPath);
  }
 
  createOrder(order: Order): void {
    this.ordersRef.push(order);
  }
 
  updateOrder(key: string, value: any): Promise<void> {
    return this.ordersRef.update(key, value);
  }
 
  deleteOrder(key: string): Promise<void> {
    return this.ordersRef.remove(key);
  }
 
  getOrdersList(): AngularFireList<Order> {
    return this.ordersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.ordersRef.remove();
  }
}
