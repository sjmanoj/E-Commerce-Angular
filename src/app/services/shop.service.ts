import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../models/dataTypes';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  public replaceUrl = 'http://localhost:5000/'
  public url = 'https://e-commerce-backend-f8v8.onrender.com/'

  public cartDataLength = new EventEmitter<Product[] | []>()

  constructor(private http: HttpClient) { }

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
    console.log(error);  
    return throwError(error)
  }

  trendyProducts(){
    // let Headers = this.getHeaders()
    return this.http.get<Product[]>(`${this.url}products`)
    .pipe(catchError(this.errorHandler))
  }

  getProduct(productId: string){
    // let Headers = this.getHeaders()
    return this.http.get<Product>(`${this.url}products/${productId}`)
    .pipe(catchError(this.errorHandler))
  }

  searchProducts(query: string){
    let Headers = this.getHeaders()
    return this.http.get<Product[]>(`${this.url}products/?category=${query}`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  addToLocal(productData: Product){
    let cartData = []
    let localCart = localStorage.getItem('localCart')
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([productData]))
      this.cartDataLength.emit([productData])
    }else{
      cartData = JSON.parse(localCart)
      cartData.push(productData)
      localStorage.setItem('localCart', JSON.stringify(cartData))
      this.cartDataLength.emit(cartData)
    }
  }

  removeFromLocal(productId: string){
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      let items:Product[] = JSON.parse(cartData)
      items = items.filter((item:Product)=>productId!==item._id)
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartDataLength.emit(items)
    }
  }

  addToCart(productData: Product){
    let Headers = this.getHeaders()
    return this.http.post<Product>(`${this.url}carts`, {productId: productData._id, quantity: productData.quantity,
    image: productData.image, title: productData.title, price: productData.price}, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  addFromLocalToCart(productData: Cart){
    let Headers = this.getHeaders()
    return this.http.post<Cart>(`${this.url}carts`, {productId: productData._id, quantity: productData.quantity,
    image: productData.image, title: productData.title, price: productData.price}, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  removeItemFromCart(productId: string){
    let userStore = localStorage.getItem('customer')
    let accessToken = userStore && JSON.parse(userStore).accessToken
    let httpHeaders: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    })
    return this.http.post<Product>(`${this.url}carts/remove-cart-item`, {productId: productId}, { headers: httpHeaders })
    .pipe(catchError(this.errorHandler))
  }

  emptyCart(){
    let Headers = this.getHeaders()
    return this.http.put<Cart>(`${this.url}carts/empty-cart`, null, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  getCart(){
    let Headers = this.getHeaders()
    return this.http.get<Cart>(`${this.url}carts/get-cart`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  getCartCount(){
    let Headers = this.getHeaders()
    return this.http.get<any>(`${this.url}carts/get-cart`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
    .subscribe((res)=>{
      if(res){
        this.cartDataLength.emit(res.cart.products)
      }
    })
  }

  createOrder(orderData: Order){
    let Headers = this.getHeaders()
    return this.http.post<Order>(`${this.url}orders`, orderData, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  getUserOrders(){
    let Headers = this.getHeaders()
    return this.http.get<Order[]>(`${this.url}orders/user-orders`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }

  deleteOrder(orderId: any){
    let Headers = this.getHeaders()
    return this.http.delete<any>(`${this.url}orders/${orderId}`, { headers: Headers })
    .pipe(catchError(this.errorHandler))
  }
}
