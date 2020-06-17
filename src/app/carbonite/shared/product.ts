import { NgIf } from '@angular/common';

export class Product {
    name: string;
    desription: string;
    quantity: number = 0;
    price: number;
    status: boolean = true;
    category: string;
    convertedImage: any;
    image: string;
    toppings: any[] = []
}