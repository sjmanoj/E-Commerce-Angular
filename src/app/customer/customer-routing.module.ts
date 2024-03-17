import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { customerAuthGuard } from '../guards/customer-auth.guard';

const routes: Routes = [
  {path: '', children:[
    {path: '', component: ShopComponent},
    {path: 'product-details/:_id', component: ProductDetailsComponent},
    {path: 'search/:params', component: SearchComponent},
    {path: 'cart', component: CartComponent, canActivate: [customerAuthGuard]},
    {path: 'checkout', component: CheckoutComponent, canActivate: [customerAuthGuard]},
    {path: 'orders', component: OrderComponent, canActivate: [customerAuthGuard]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
