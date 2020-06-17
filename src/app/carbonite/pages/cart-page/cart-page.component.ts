import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { map } from 'rxjs/operators';
import { Address } from '../../shared/address';
import { AddressService } from '../../services/address.service';
import { StoreService } from '../../services/store.service';
import { Order } from '../../shared/order';
import * as moment from 'moment';
import { ordersService } from '../../services/order.service';
// import  {mercadopago} from 'node_modules/mercadopago';

@Injectable()
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  addAddressForm

  order: Order = new Order();
  cartItems
  address: Address = new Address();

  anotherPhone
  subTotal
  selectedPayment = 1
  deliveryPrice = 0

  anotherPhoneNumber

  userAddresses

  showCOmplements = false
  showCOmplementsId

  returnedDistricts
  storeInfo
  haveStoreInfo

  returnedDistrictInformation
  unlockByAddress

  constructor(
    private router: Router,
    private userService: UsersService,
    private addressService: AddressService,
    private storeService: StoreService,
    private orderService: ordersService,
  ) {
    // mercadoPago.configure({
    //   access_token: 'TEST-1490751100774668-061200-446d0660952b6bd396d0598de2f0e306-455524849'
    // });
  }

  ngOnInit() {
    if (sessionStorage.getItem('userKey')) {
      this.cartItems = JSON.parse(sessionStorage.getItem('cartItems'))
      this.getSubTotal()
      this.getUserAddresses()
      this.getStoreInfo()
    } else {
      sessionStorage.setItem('loginToCheckout', 'true')
      this.router.navigateByUrl('login')
    }
  }

  getUserAddresses() {
    this.userService.getUsersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(users => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].key === sessionStorage.getItem('userKey')) {
          if (users[i].address) {
            this.userAddresses = users[i].address
          } else {
            this.userAddresses = null
          }
        }
      }
      this.checkUserDistrict()

    });
  }

  getStoreInfo() {
    this.storeService.getStoresList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(store => {
      if (store.length > 0) {
        for (let i = 0; i < store[0].localRanges.length; i++) {
          store[0].localRanges[i].id = i
        }
        this.returnedDistricts = store[0].localRanges
        delete store[0].localRanges
        this.storeInfo = store[0]
        this.haveStoreInfo = true
      } else {
        this.haveStoreInfo = false
      }
    });
  }

  removeItem(key) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i].cartItemId == key) {
        this.cartItems.splice(i, 1)
      }
    }


    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems))

    if (sessionStorage.getItem('cartItems') === '[]') {
      sessionStorage.removeItem('cartItems')
    }

    this.getSubTotal()
  }

  getSubTotal() {
    if (!sessionStorage.getItem('cartItems')) {

      this.subTotal = 0
    } else {

      let cart = JSON.parse(sessionStorage.getItem('cartItems'))
      const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;



      let sum: any[] = []

      for (let i = 0; i < cart.length; i++) {
        sum.push(cart[i].price * cart[i].quantity)
      }
      this.subTotal = sum.reduce(reducerPlus)
    }
  }

  emptyCart() {
    sessionStorage.removeItem('cartItems')
    this.router.navigateByUrl('products')
  }

  changeitemQUantity(id, operator) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (id == this.cartItems[i].cartItemId) {
        if (operator === '+') {
          this.cartItems[i].quantity += 1
        } else {
          if (this.cartItems[i].quantity > 1) {
            this.cartItems[i].quantity -= 1
          } else {
            this.cartItems.splice(i, 1)
          }
        }
      }
    }

    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems))

    if (sessionStorage.getItem('cartItems') === '[]') {
      sessionStorage.removeItem('cartItems')
    }

    this.getSubTotal()
  }

  checkZip() {
    if (this.address.zip.length == 8) {
      this.addressService.getAddressByZip(this.address.zip).subscribe(
        res => {
          this.address.address = res.logradouro
          this.address.neightborhood = res.bairro
          this.address.city = res.localidade
          this.address.state = res.uf
          this.checkUserDistrict()
        }
      )
    }
  }

  saveAddress() {
    let key = sessionStorage.getItem('userKey')
    this.userService.updateUser(
      key,
      {
        address: this.address
      }
    )
      .catch(err => console.log(err));
    this.addAddressForm = false
  }

  checkUserDistrict() {
    setTimeout(() => {
      if (this.addAddressForm) {
        for (let i = 0; i < this.returnedDistricts.length; i++) {
          if (this.address.neightborhood.toUpperCase() == this.returnedDistricts[i].name.toUpperCase()) {
            this.unlockByAddress = this.returnedDistricts[i].status
            this.deliveryPrice = this.returnedDistricts[i].value
            this.returnedDistrictInformation = this.returnedDistricts[i]
          }
        }
      } else {
        for (let i = 0; i < this.returnedDistricts.length; i++) {
          if (this.userAddresses.neightborhood.toUpperCase() == this.returnedDistricts[i].name.toUpperCase()) {
            this.unlockByAddress = this.returnedDistricts[i].status
            this.deliveryPrice = this.returnedDistricts[i].value
            this.returnedDistrictInformation = this.returnedDistricts[i]
          }
        }
      }
    }, 200)

  }

  checkout() {
    this.order.createdDate = moment().format('DD-MM-YYYY')
    this.order.items = this.cartItems
    this.order.price = this.subTotal + this.deliveryPrice
    this.order.subTotal = this.subTotal
    this.order.deliveryPrice = this.deliveryPrice
    this.order.userAddress = this.userAddresses
    this.order.updateDate = moment().format('DD-MM-YYYY')
    this.order.timeToDelivery = this.returnedDistrictInformation.timeToDelivery
    this.order.paymentType = this.selectedPayment

    if(this.anotherPhoneNumber) {
      this.order.userPhone = this.anotherPhoneNumber
    } else {
      this.order.userPhone = sessionStorage.getItem('phone')
    }

    this.orderService.createOrder(this.order);


    this.router.navigateByUrl('full-orders')
    sessionStorage.removeItem('cartItems')
  }


}
