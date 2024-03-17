import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { SellerSignupService } from "../services/seller-signup.service";


@Injectable({
  providedIn: 'root'
})
export class sellerAuthGuard implements CanActivate{
  constructor(private sellerSignupService: SellerSignupService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(localStorage.getItem('admin')){
      return true;
     }

    return this.sellerSignupService.isSellerLoggedIn
  }
}