import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';
import { SellerSignupComponent } from './seller-signup/seller-signup.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {path: 'customer-signup', component: CustomerSignupComponent},
  {path: 'seller-signup', component: SellerSignupComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
