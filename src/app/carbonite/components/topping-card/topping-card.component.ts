import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { map } from 'rxjs/operators';
import { FooterFixedComponent } from '../footer-fixed/footer-fixed.component';
import { Router } from '@angular/router';

@Component({
  selector: 'topping-card',
  templateUrl: './topping-card.component.html',
  styleUrls: ['./topping-card.component.scss']
})
export class ToppingCardComponent implements OnInit {

  @Input() toppings

  
  admin
  
  selectedEditId
  colapsed = true
  
  selectedNotedId
  productNote
  noted = false

  loading = false

  haveProduct
  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProducts()
    this.checkAdmin()
  }

  checkAdmin() {
    if (sessionStorage.getItem('admin')) {
      this.admin = true
    } else {
      this.admin = false
    }
  }

  getAllProducts() {
    this.productService.getToppingsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(toppings => {
      this.toppings = toppings
      if (toppings.length > 0) {

        this.haveProduct = true
      } else {
        this.haveProduct = false
      }
    });
  }

  updateStatus(key: any, statusCode: boolean) {
    this.productService.updateTopping(key, { status: statusCode })
      .catch(err => console.log(err));
  }

  updateProduct(key, product) {
    this.productService.updateTopping(
      key,
      {
        name: product.name,
        desription: product.desription,
        price: parseInt(product.price),
        status: product.status
      }
      )
      .catch(err => console.log(err));
      this.selectedEditId = null
      this.colapsed = true
  }

  addToCart(product) {
    this.showLoading()
    let cart: any[] = JSON.parse(sessionStorage.getItem('cartItems'))

    let items:any[] = []

    let body = {
      cartItemId: product.key+ + Math.floor(Math.random() * 10),
      name: product.name,
      quantity: 1,
      price: product.price,
      note: this.productNote
    }

    if(sessionStorage.getItem('cartItems')) {
      if(cart || cart.length > 0) {
        for(let i = 0; i < cart.length; i++) {
          items.push(cart[i])
        }
      }
    }

    items.push(body)

    sessionStorage.setItem('cartItems', JSON.stringify(items))

    this.router.navigateByUrl('cart')
  }

  showLoading() {
    this.loading = true
  }

  hideLoading() {
    this.loading = false

  }


}
