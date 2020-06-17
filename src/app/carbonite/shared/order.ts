export class Order {
    items: Array<any>
    userKey: string = sessionStorage.getItem('userKey');
    userNname: string = sessionStorage.getItem('userName');
    userPhone: string;
    userEmail: string = sessionStorage.getItem('userEmail')
    userAddress: any;
    createdDate: string;
    status: number = 1;
    payment: boolean = false;
    updateDate: string;
    price: number;
    subTotal: number;
    deliveryPrice: number;
    timeToDelivery: string;
    paymentType: number;
}