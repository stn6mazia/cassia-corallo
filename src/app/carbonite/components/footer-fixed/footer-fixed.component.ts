import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ordersService } from '../../services/order.service';
import { Order } from '../../shared/order';
import * as moment from 'moment';

@Component({
  selector: 'footer-fixed',
  templateUrl: './footer-fixed.component.html',
  styleUrls: ['./footer-fixed.component.scss']
})
export class FooterFixedComponent implements OnInit {

  cartPrice
  cartQuantity

  order: Order = new Order()


  loading = false
  cartId = 1

  constructor(
    private router: Router,
    private orderService: ordersService
  ) {
    router.events.subscribe(event => {
      if (router.url.includes('cart')) {
        this.cartId = 2
      } else {
        this.cartId = 1
      }
    }
    )
  }

  ngOnInit() {
    this.checkPrice()
  }

  checkPrice() {

    if (!sessionStorage.getItem('cartItems')) {

      this.cartPrice = 0
    } else {

      let cart = JSON.parse(sessionStorage.getItem('cartItems'))
      const reducerPlus = (accumulator, currentValue) => accumulator + currentValue;



      let sum: any[] = []

      for (let i = 0; i < cart.length; i++) {
        sum.push(cart[i].price)
      }

      this.cartQuantity = cart.length

      this.cartPrice = sum.reduce(reducerPlus)
    }

  }

  openCart() {
    this.router.navigateByUrl('cart')
  }

  checkout() {
    this.order = new Order()
    this.order.createdDate = moment().format('DD-MM-YYYY HH:mm')

    let usr = {
      name:sessionStorage.getItem('userName'),
      phone:sessionStorage.getItem('phone'),
      email:sessionStorage.getItem('userEmail'),
      key:sessionStorage.getItem('userKey')
    }
    this.order.userNname = usr.name
    this.order.userPhone = usr.phone
    this.order.userEmail = usr.email
    this.order.userKey = usr.key
    this.order.items = JSON.parse(sessionStorage.getItem('cartItems'))

    this.order.price = this.cartPrice

    this.orderService.createOrder(this.order)
    sessionStorage.removeItem('cartItems')
    this.router.navigateByUrl(`user/${sessionStorage.getItem('userKey')}/orders`)
  }

  showLoading() {
    this.loading = true
  }

  hideLoading() {
    this.loading = false

  }

}
