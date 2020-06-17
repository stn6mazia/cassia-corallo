import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { EventEmitter } from '@angular/core';
import { Topping } from '../../shared/topping';
import { map } from 'rxjs/operators';

@Component({
  selector: 'topping-form',
  templateUrl: './topping-form.component.html',
  styleUrls: ['./topping-form.component.scss']
})
export class ToppingFormComponent implements OnInit {

  @Output() emitCloseForm = new EventEmitter<any>()

  topping: Topping = new Topping()

  productForm: FormGroup

  submitted = true

  categoriesList
  haveCategories

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.mountForm()
    this.getCategoryList()
  }

  mountForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]]
    })

    this.productForm.valueChanges.subscribe().unsubscribe() 
  }

  getCategoryList() {
    this.productService.getCategoriesList().snapshotChanges().pipe(
      map(changes =>
        changes.map(p =>
          ({ key: p.payload.key, ...p.payload.val() })
        )
      )
    ).subscribe(categories => {
      if (categories.length > 0) {
        this.categoriesList = categories
        this.haveCategories = true
      } else {
        this.haveCategories = false
      }
    });
  }


  save() {
    this.topping.price = parseInt(this.productForm.get('price').value)
    this.productService.createTopping(this.topping);
    this.topping = new Topping();
    this.submitted = true;
    this.emitCloseForm.emit(false)
  }
  
  onSubmit() {
    this.submitted = false
    this.save();
  }

}
