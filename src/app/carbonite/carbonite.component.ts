import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';
import { Product } from './shared/product';
import { Router } from '@angular/router';

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
    private router: Router
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
  }



}
