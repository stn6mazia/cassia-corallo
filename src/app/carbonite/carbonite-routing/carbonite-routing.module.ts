import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { LoginPageComponent, ProductsPageComponent, ProductDetailPageComponent, AdminPageComponent, CartPageComponent, UserComponent, UserOrdersPageComponent, FullOrdersComponent, OrderDetailPageComponent, StoreSettingsPageComponent } from '../pages';
import { CarboniteComponent } from '../carbonite.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: LoginPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailPageComponent
  },
  {
    path: 'cart',
    component: CartPageComponent
  },
  {
    path: 'store-settings',
    component: StoreSettingsPageComponent
  },
  {
    path: 'full-orders',
    component: FullOrdersComponent
  },
  {
    path: 'order/:id',
    component: OrderDetailPageComponent
  },
  {
    path: 'user/:id',
    component: UserComponent,
    children: [
      {
        path: 'orders',
        component: UserOrdersPageComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { 
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class CarboniteRoutingModule { }
