import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AddProductsComponent } from './views/admin/add-products/add-products.component';
import { AdminLoginComponent } from './views/admin/admin-login/admin-login.component';
import { AdminSignupComponent } from './views/admin/admin-signup/admin-signup.component';
import { EditProductComponent } from './views/admin/edit-product/edit-product.component';
import { PlacedOrdersComponent } from './views/admin/placed-orders/placed-orders.component';
import { UserDetailsComponent } from './views/admin/user-details/user-details.component';
import { ViewProductsComponent } from './views/admin/view-products/view-products.component';
import { CartComponent } from './views/user/cart/cart.component';
import { OrdersComponent } from './views/user/orders/orders.component';
import { PlaceOrderComponent } from './views/user/place-order/place-order.component';
import { UserLoginComponent } from './views/user/user-login/user-login.component';
import { UserSignupComponent } from './views/user/user-signup/user-signup.component';
import { UserViewProductsComponent } from './views/user/user-view-products/user-view-products.component';
import { ViewOrderedProductsComponent } from './views/user/view-ordered-products/view-ordered-products.component';

const routes: Routes = [
  {
    path:'admin',component:ViewProductsComponent
  },
  {
    path:'admin-signup',component:AdminSignupComponent
  },
  {
    path:'user-signup',component:UserSignupComponent
  },
  {
    path:'admin-login',component:AdminLoginComponent
  },
  {
    path:'add-products',component:AddProductsComponent
  },
  {
    path:'edit-product/:id',component:EditProductComponent
  },
  {
    path:'',component:UserViewProductsComponent
  },
  {
    path:'user-login',component:UserLoginComponent
  },
  {
    path:'cart',component:CartComponent
  },
  {
    path:'place-order',component:PlaceOrderComponent
  },
  {
    path:'view-ordered-products/:orderId',component:ViewOrderedProductsComponent
  },
  {
    path:'orders',component:OrdersComponent
  },
  {
    path:'admin/placed-orders',component:PlacedOrdersComponent
  },
  {
    path:'admin/user-details',component:UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
