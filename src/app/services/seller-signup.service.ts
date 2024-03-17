import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Signup } from '../models/dataTypes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerSignupService {

  public replaceUrl = 'http://localhost:5000/'
  public url = 'https://e-commerce-backend-f8v8.onrender.com/'
  public signupMsg = new EventEmitter<boolean>(false)
  public isSellerLoggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  getHeaders(){
    let userStore = localStorage.getItem('admin')
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
    userData.isAdmin = true //for Admin Users
    let userDataMadeAdmin = userData
    return this.http.post<Signup>(`${this.url}auth/register`, userDataMadeAdmin)
    .pipe(catchError(this.errorHandler))
  }

  loginUser(userData: Signup){
    this.http.post<Signup>(`${this.url}auth/login`, userData)
    .pipe(catchError(this.errorHandler))
    .subscribe((res)=>{
      if(res && res.accessToken && res._id){
        if(res.isAdmin===true){
          this.isSellerLoggedIn.next(true)
          localStorage.setItem('admin', JSON.stringify({_id: res._id, accessToken: res.accessToken}))
          this.router.navigate(['/products'])
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
    if(localStorage.getItem('admin')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['/products'])
    }
  }

  getUser(userData: Signup){
    let Headers = this.getHeaders()
    return this.http.get<Signup>(`${this.url}users/${userData._id}`, { headers: Headers })
  }
}
