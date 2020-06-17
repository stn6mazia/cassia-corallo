import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss']
})
export class ProductDetailPageComponent implements OnInit {
  productsList
  haveProduct
  toppingsList
  haveToppings
  categoryList
  haveCategories

  selectedProduct

  selectedToppings = []
  productNote

  addingNote = false

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProducts()
    this.getAllToppings()
    this.getAllCategories()
  }

  getAllProducts() {
    this.productService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(products => {
      if (products.length > 0) {
        let name = this.router.url.split('/')

        for (let i = 0; i < products.length; i++) {
          if (products[i].name == name[2]) {
            this.selectedProduct = products[i]
          }
        }

        this.productsList = products
        this.haveProduct = true
      } else {
        this.haveProduct = false
      }
    });
  }

  getAllToppings() {
    this.productService.getToppingsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(toppings => {
      if (toppings.length > 0) {
        this.toppingsList = toppings
        this.haveToppings = true
      } else {
        this.haveToppings = false
      }
    });
  }

  getAllCategories() {
    this.productService.getCategoriesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(category => {
      if (category.length > 0) {
        this.categoryList = category
        this.haveCategories = true
      } else {
        this.haveCategories = false
      }
    });
  }

  changeComplementQUantity(key, operator) {
    for (let i = 0; i < this.toppingsList.length; i++) {
      if (key == this.toppingsList[i].key) {
        if (operator === '+') {
          this.toppingsList[i].quantity += 1
          this.selectedProduct.price += this.toppingsList[i].price
        } else {
          this.toppingsList[i].quantity -= 1
          this.selectedProduct.price -= this.toppingsList[i].price
        }
      }
    }

    this.selectedToppings = this.toppingsList


  }

  addToCart(product) {
    let cart: any[] = JSON.parse(sessionStorage.getItem('cartItems'))

    for(let i = 0; i < this.selectedToppings.length; i++) {
      if(this.selectedToppings[i].quantity == 0) {
        this.selectedToppings.splice(i, 1)
      }
    }

    let items: any[] = []

    let body = {
      cartItemId: product.key + Math.floor(Math.random() * 10),
      name: product.name,
      quantity: 1,
      price: product.price,
      toppings: this.selectedToppings,
      note: this.productNote
    }

    if (sessionStorage.getItem('cartItems')) {
      if (cart || cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          items.push(cart[i])
        }
      }
    }

    items.push(body)

    sessionStorage.setItem('cartItems', JSON.stringify(items))

    this.router.navigateByUrl('cart')
  }

}
