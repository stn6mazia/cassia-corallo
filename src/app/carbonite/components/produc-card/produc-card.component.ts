import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { map } from 'rxjs/operators';
import { FooterFixedComponent } from '../footer-fixed/footer-fixed.component';
import { Router } from '@angular/router';

@Component({
  selector: 'produc-card',
  templateUrl: './produc-card.component.html',
  styleUrls: ['./produc-card.component.scss']
})
export class ProducCardComponent implements OnInit {

  @Input() category
  @Input() products


  selectedCAtegoryMenu
  admin
  categoryList
  haveCategories

  selectedEditId
  colapsed = true

  imageToUpdate
  base64textString

  selectedNotedId
  productNote
  noted = false

  loading = false

  toppings

  haveProduct

  showToppings = false
  selectedToppdId

  selectedToppings: any[] = []

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllCategories()
    this.getAllProducts()
    this.getAllToppings()
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
    this.productService.getProductsList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(products => {
      this.products = products
      if (products.length > 0) {

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
      this.toppings = toppings
      if (toppings.length > 0) {

        this.haveProduct = true
      } else {
        this.haveProduct = false
      }
    });
  }

  changeTopping(qt, topId, operator) {
    let topped
    if (operator === '+') {
      for (let i = 0; i < this.toppings.length; i++) {
        if (topId == this.toppings[i].key) {
          this.toppings[i].quantity = qt + 1
          topped = this.toppings[i]
        }
      }
    } else if (operator === '-') {
      for (let i = 0; i < this.toppings.length; i++) {
        if (topId == this.toppings[i].key) {
          this.toppings[i].quantity = qt - 1
          topped = this.toppings[i]
        }
      }
    }

    if (qt >= 0 && operator === '+') {
      this.selectedToppings.push(topped)
    }
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
        this.selectedCAtegoryMenu = category[0].name
        this.categoryList = category
        this.haveCategories = true
      } else {
        this.haveCategories = false
      }
    });
  }

  updateStatus(key: any, statusCode: boolean) {
    this.productService.updateProduct(key, { status: statusCode })
      .catch(err => console.log(err));
  }

  updateProduct(key, product) {
    this.productService.updateProduct(
      key,
      {
        image: this.imageToUpdate,
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

    let items: any[] = []

    let body = {
      cartItemId: product.key + + Math.floor(Math.random() * 10),
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

  showLoading() {
    this.loading = true
  }

  hideLoading() {
    this.loading = false

  }

  saveImgBaseSixtyFour(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

    this.imageToUpdate = btoa(binaryString)
  }

  goToProductDetail(evt) {
    this.router.navigateByUrl('product/' + evt)
  }

}
