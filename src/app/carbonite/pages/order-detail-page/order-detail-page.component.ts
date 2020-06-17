import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ordersService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail-page',
  templateUrl: './order-detail-page.component.html',
  styleUrls: ['./order-detail-page.component.scss']
})
export class OrderDetailPageComponent implements OnInit {

  ordersList
  detailOrder
  detailOrderId
  haveOrder = false
  detail = false

  admin


  constructor(
    private ordersService: ordersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mountUser()
    this.detailOrderId = JSON.parse(sessionStorage.getItem('orderDetailId'))
    this.getOrders()
  }

  mountUser() {

    if (sessionStorage.getItem('admin')) {
      this.admin = true
    } else {
      this.admin = false
    }
  }

  getOrders() {
    this.ordersService.getOrdersList().snapshotChanges().pipe(
      map
      (changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(orders => {
      if (orders.length > 0) {
        for(let i = 0; i < orders.length; i++) {
          if(orders[i].key == this.detailOrderId.key) {
            this.detailOrder = orders[i]
          }
           
        }
        this.haveOrder = true
      } else {
        this.haveOrder = false
      }
    });
  }

  print() {
    window.print()
  }

}
