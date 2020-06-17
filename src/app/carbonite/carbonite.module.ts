import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CarboniteComponent } from './carbonite.component';
import { ProducCardComponent, UserInfoComponent, ProductFormComponent, FooterFixedComponent, SideBarComponent, HeaderComponent, UserOrdersComponent, OrderControlerComponent, ToppingCardComponent, ToppingFormComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientModule } from '@angular/common/http';


import { AdminPageComponent, CheckoutPageComponent, LoginPageComponent, ProductsPageComponent, ProductDetailPageComponent, CartPageComponent, UserComponent, UserOrdersPageComponent, FullOrdersComponent, OrderDetailPageComponent, StoreSettingsPageComponent } from './pages';
import { CarboniteRoutingModule } from './carbonite-routing/carbonite-routing.module';
import { CurrencyFormat } from './shared/pipes/currency-format.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingComponent } from './shared/loading/loading.component';
import { DndModule } from 'ngx-drag-drop';
import { NgxMaskModule } from 'ngx-mask'






@NgModule({
  declarations: [
    CarboniteComponent,

    ProducCardComponent,
    UserInfoComponent,
    ProductFormComponent,
    FooterFixedComponent,
    SideBarComponent,
    HeaderComponent,
    UserOrdersComponent,
    OrderControlerComponent,
    OrderDetailPageComponent,
    ToppingCardComponent,
    ToppingFormComponent,
    
    AdminPageComponent,
    CheckoutPageComponent,
    LoginPageComponent,
    ProductsPageComponent,
    ProductDetailPageComponent,
    CartPageComponent,
    UserComponent,
    UserOrdersPageComponent,
    FullOrdersComponent,
    StoreSettingsPageComponent,

    CurrencyFormat,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CarboniteRoutingModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    NgxSpinnerModule,
    DndModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  exports: [
    CarboniteComponent
  ],
  providers: [
    FooterFixedComponent
  ]
})
export class CarboniteModule { }
