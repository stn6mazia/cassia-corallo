import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { LoginPageComponent, ProductsPageComponent, ProductDetailPageComponent, AdminPageComponent, CartPageComponent, UserComponent, UserOrdersPageComponent, FullOrdersComponent, OrderDetailPageComponent, StoreSettingsPageComponent, InitPageComponent, AboutPageComponent, ContactPageComponent } from '../pages';
import { CarboniteComponent } from '../carbonite.component';

export const routes: Routes = [
  {
    path: '',
    component: InitPageComponent
  },
  {
    path: 'produtos',
    component: ProductsPageComponent
  },
  {
    path: 'sobre-nos',
    component: AboutPageComponent
  },
  {
    path: 'contato',
    component: ContactPageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CarboniteRoutingModule { }
