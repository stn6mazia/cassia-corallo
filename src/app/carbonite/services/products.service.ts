import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../shared/product';
import { Topping } from '../shared/topping';
import { Category } from '../shared/category';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  private dbPath = '/products';
  private dbPathTopping = '/toppings';
  private dbPathCategory = '/categories';
 
  productsRef: AngularFireList<Product> = null;
  toppingsRef: AngularFireList<Topping> = null;
  categoriesRef: AngularFireList<Category> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
    this.toppingsRef = db.list(this.dbPathTopping);
    this.categoriesRef = db.list(this.dbPathCategory);
  }
 
  createProduct(product: Product): void {
    this.productsRef.push(product);
  }
  createCategory(category: Category): void {
    this.categoriesRef.push(category);
  }
 
  updateProduct(key: string, value: any): Promise<void> {
    return this.productsRef.update(key, value);
  }
 
  deleteProduct(key: string): Promise<void> {
    return this.productsRef.remove(key);
  }
 
  getProductsList(): AngularFireList<Product> {
    return this.productsRef;
  }
  getCategoriesList(): AngularFireList<Category> {
    return this.categoriesRef;
  }
 
  deleteAllToppings(): Promise<void> {
    return this.toppingsRef.remove();
  }
  createTopping(topping: Topping): void {
    this.toppingsRef.push(topping);
  }
 
  updateTopping(key: string, value: any): Promise<void> {
    return this.toppingsRef.update(key, value);
  }
 
  deleteTopping(key: string): Promise<void> {
    return this.toppingsRef.remove(key);
  }
 
  getToppingsList(): AngularFireList<Topping> {
    return this.toppingsRef;
  }
 
  deleteAll(): Promise<void> {
    return this.toppingsRef.remove();
  }
}
