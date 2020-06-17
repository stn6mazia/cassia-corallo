import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) {}
 
  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();
  }

}
