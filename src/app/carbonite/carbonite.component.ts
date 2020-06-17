import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';
import { Product } from './shared/product';
import { Router } from '@angular/router';
import { StoreService } from './services/store.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'carbonite',
  templateUrl: './carbonite.component.html',
  styleUrls: ['./carbonite.component.scss']
})
export class CarboniteComponent implements OnInit {

  userId

  title = 'Angular8Firebase';
  description = 'Angular-Fire-Demo';

  product: Product

  itemValue = '';
  items: Observable<any[]>;

  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('userKey')) {
      this.userId = true
      if(sessionStorage.getItem('admin')) {
        this.router.navigateByUrl('full-orders')
      } else {
        this.router.navigateByUrl('products')
      }
    } else {
      this.userId = false
      this.router.navigateByUrl('products')
    }
    this.getStoreInformation()
  }

  getStoreInformation() {
    this.storeService.getStoresList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(store => {
      if (store.length > 0) {
        sessionStorage.setItem('storeInfo', JSON.stringify(store[0]))
      }
    });
  }



}
