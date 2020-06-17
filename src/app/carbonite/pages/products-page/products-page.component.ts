import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Category } from '../../shared/category';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  category: Category = new Category()

  userName
  cartQuantity
  admin
  hasExtra = false

  newCategoryForm
  categoryWithExtra

  productsList
  toppingsList
  categoryList

  haveUser
  ProductList = true

  selectedCategoryList
  haveProduct = false
  haveToppings = false
  haveCategories = false


  createUser = false
  createTopping = false

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mountUser()
    this.getAllCategories()
    this.getAllProducts()
    this.getAllToppings()
    this.checkCartQuantity()
    if(sessionStorage.getItem('userKey')) {
      this.haveUser = true
    } else {
      this.haveUser = false
    }
  }

  mountUser() {
    this.userName = sessionStorage.getItem('userName')

    if (sessionStorage.getItem('admin')) {
      this.admin = true
    } else {
      this.admin = false
    }
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

  goToOrders() {
    this.router.navigateByUrl(`user/${sessionStorage.getItem('userKey')}/orders`)
  }

  goToFullOrders() {
    this.router.navigateByUrl(`full-orders`)
  }

  logout() {
    sessionStorage.clear();
    window.location.reload()
  }

  createCategory(name, extra) {
    this.category.name = name
    this.category.extra = extra
    this.productService.createCategory(this.category)
    this.newCategoryForm = false
  }

  selectCategoryToList(evt) {
    let category = this.categoryList.filter(x => x.name == evt)
    console.log(category)

    if (category) {
      this.selectedCategoryList = category[0].name
      this.categoryWithExtra = parseInt(category[0].extra)
    }
  }

  checkCartQuantity() {

    if (!sessionStorage.getItem('cartItems')) {

      this.cartQuantity = 0
    } else {

      let cart = JSON.parse(sessionStorage.getItem('cartItems'))
      const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;



      let sum: any[] = []

      for (let i = 0; i < cart.length; i++) {
        sum.push(cart[i].price)
      }

      this.cartQuantity = cart.length

    }

  }
}
