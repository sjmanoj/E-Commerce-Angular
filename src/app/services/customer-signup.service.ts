import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Cart, Product, Signup } from '../models/dataTypes';
import { Router } from '@angular/router';
import { ShopService } from './shop.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerSignupService {

  public replaceUrl = 'http://localhost:5000/'
  public url = 'https://e-commerce-backend-f8v8.onrender.com/'
  public signupMsg = new EventEmitter<boolean>(false)
  public isCustomerLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router, private shopService: ShopService) { }

  getHeaders(){
    let userStore = localStorage.getItem('customer')
    let accessToken = userStore && JSON.parse(userStore).accessToken

    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${accessToken}`
    })

    return httpHeaders

  }

  errorHandler(error: HttpErrorResponse){
    // console.log(error.error.message);  
    return throwError(error)
  }

  signupUser(userData: Signup){
    return this.http.post<Signup>(`${this.url}auth/register`, userData)
    .pipe(catchError(this.errorHandler))
  }

  loginUser(userData: Signup){
    this.http.post<Signup>(`${this.url}auth/login`, userData)
    .pipe(catchError(this.errorHandler))
    .subscribe((res)=>{
      if(res && res.accessToken && res._id){
        if(res.isAdmin===false){
          this.isCustomerLoggedIn.next(true)
          localStorage.setItem('customer', JSON.stringify({_id: res._id, accessToken: res.accessToken}))
          this.router.navigate(['/'])
          this.localCartToDB()
        }else{
          this.signupMsg.emit(true)
        }  
      }
    }, (err)=>{
      if(err){
        this.signupMsg.emit(true)
      }
    })
  }

  reloadSeller(){
    if(localStorage.getItem('customer')){
      this.isCustomerLoggedIn.next(true)
      this.router.navigate(['/'])
    }
  }

  getUser(userData: Signup){
    let Headers = this.getHeaders()
    return this.http.get<Signup>(`${this.url}users/${userData._id}`, { headers: Headers })
  }

  localCartToDB(){
    let data = localStorage.getItem('localCart')
    if(data){
      let cartDataList:Product[] = JSON.parse(data)

      cartDataList.forEach((product: Product, index)=> {
        let cartData: Cart={
          ...product,
          productId: product._id
        }
        // console.log(cartData);
        
        this.shopService.addFromLocalToCart(cartData).subscribe((res)=>{
          if(res){
            console.log(res)
          }
        })
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCart')
        }
      })
    }
    
    this.shopService.getCartCount()
    
  }
}
