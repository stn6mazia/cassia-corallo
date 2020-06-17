import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ordersService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../shared/order';
import * as moment from 'moment'

@Component({
  selector: 'app-full-orders',
  templateUrl: './full-orders.component.html',
  styleUrls: ['./full-orders.component.scss']
})
export class FullOrdersComponent implements OnInit {

  orderType = 'Em andamento'

  ordersList
  detailOrder

  ShowDoneOrders = false

  activeOrders: any[] = []
  preparingOrders: any[] = []
  doneOrders: any[] = []
  payedOrders: any[] = []

  haveOrder = false
  detail = false

  whatsappLink
  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };

  constructor(
    private ordersService: ordersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getOrders()
  }

  getOrders() {
    this.ordersService.getOrdersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(orders => {
      if (orders.length > 0) {
        for (let i = 0; i < orders.length; i++) {
          if (orders[i].status == 1) {
            this.activeOrders.push(orders[i])
          }
          if (orders[i].status == 2) {
            this.preparingOrders.push(orders[i])
          }
          if (orders[i].status == 3) {
            this.doneOrders.push(orders[i])
          }
          if (orders[i].status == 4) {
            this.payedOrders.push(orders[i])
          }

        }
        this.haveOrder = true
      } else {
        this.haveOrder = false
      }
    });
  }

  aproveOrder(key) {
    this.ordersService.updateOrder(key, { status: 2, updateDate: moment().format('DD-MM-YYYY HH:mm') })
    this.getOrders() 
  }

  doneOrder(key, name, phone) {

    this.ordersService.updateOrder(key, { status: 3, updateDate: moment().format('DD-MM-YYYY HH:mm') })
    this.getOrders()
  }

  payedOrder(key) {


    this.ordersService.updateOrder(key, { status: 4, payment: true, updateDate: moment().format('DD-MM-YYYY HH:mm') })
    this.getOrders()
  }

  detailPage(order) {
    this.router.navigateByUrl('order/' + order.key)
    sessionStorage.setItem('orderDetailId', JSON.stringify(order))
  }

  logout() {
    sessionStorage.clear()
    window.location.reload()
  }

  sendWhatssappMsg(evt) {
    let url = `https://api.whatsapp.com/send?phone=55${evt.userPhone}&text=Olá ${evt.userNname}, segue o link de pagamento com mercado pago no seu pedido do Carbonite Burger ${this.whatsappLink}`
    window.open(url, "_blank");
  }
  
  orderPayedMsg(evt) {
    let url
    if(evt.paymentType = 1) {
      url = `https://api.whatsapp.com/send?phone=55${evt.userPhone}&text=Olá ${evt.userNname}, o seu pedido já está sendo preparado`
    } else {
      url = `https://api.whatsapp.com/send?phone=55${evt.userPhone}&text=Olá ${evt.userNname}, o seu pagamento foi aprovado e seu pedido já está sendo preparado`
    }
    window.open(url, "_blank");  
  }
  orderDoneMsg(evt) {
    let url = `https://api.whatsapp.com/send?phone=55${evt.userPhone}&text=Olá ${evt.userNname}, o seu pedido saiu para a entrega, atenção a chegada do nosso entregador. Bom apetite!`
    window.open(url, "_blank");  
  }

}
