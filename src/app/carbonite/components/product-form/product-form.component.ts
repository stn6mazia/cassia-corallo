import { Component, OnInit, Output } from '@angular/core';
import { Product } from '../../shared/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Output() emitCloseForm = new EventEmitter<any>()

  product: Product = new Product()
  base64textString


  categoriesList
  haveCategories

  productForm: FormGroup

  submitted = true

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
      image: ['', [Validators.required]],
      category: ['', [Validators.required]],
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
    this.product.price = parseInt(this.productForm.get('price').value)
    this.productService.createProduct(this.product);
    this.product = new Product();
    this.submitted = true;
    this.emitCloseForm.emit(false)
  }

  onSubmit() {
    this.submitted = false
    this.save();
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

    this.product.image = btoa(binaryString)
  }
}
