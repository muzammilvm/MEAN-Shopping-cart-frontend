import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminHeaderComponent } from './partials/admin-header/admin-header.component';
import { UserHeaderComponent } from './partials/user-header/user-header.component';
import { AdminSignupComponent } from './views/admin/admin-signup/admin-signup.component';
import { UserSignupComponent } from './views/user/user-signup/user-signup.component';
import { AdminLoginComponent } from './views/admin/admin-login/admin-login.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { ViewProductsComponent } from './views/admin/view-products/view-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { AddProductsComponent } from './views/admin/add-products/add-products.component';
import { EditProductComponent } from './views/admin/edit-product/edit-product.component';
import { UserViewProductsComponent } from './views/user/user-view-products/user-view-products.component';
import { CartComponent } from './views/user/cart/cart.component';
import { PlaceOrderComponent } from './views/user/place-order/place-order.component';
import { ViewOrderedProductsComponent } from './views/user/view-ordered-products/view-ordered-products.component';
import { OrdersComponent } from './views/user/orders/orders.component';
import { PlacedOrdersComponent } from './views/admin/placed-orders/placed-orders.component';
import { UserDetailsComponent } from './views/admin/user-details/user-details.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    AdminSignupComponent,
    UserSignupComponent,
    AdminLoginComponent,
    UserLoginComponent,
    ViewProductsComponent,
    AddProductsComponent,
    EditProductComponent,
    UserViewProductsComponent,
    CartComponent,
    PlaceOrderComponent,
    ViewOrderedProductsComponent,
    OrdersComponent,
    PlacedOrdersComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
