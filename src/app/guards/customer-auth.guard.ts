import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CustomerSignupService } from "../services/customer-signup.service";


@Injectable({
  providedIn: 'root'
})
export class customerAuthGuard implements CanActivate{
  constructor(private customerSignupService: CustomerSignupService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('customer')){
      return true;
     }

    return this.customerSignupService.isCustomerLoggedIn
  }
}