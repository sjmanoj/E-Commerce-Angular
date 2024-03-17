import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  public productId: string | undefined
  public productDetails: Product | undefined
  public productQuantity: number = 1
  public removeCartLink: boolean = false
  public cartData: any

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.productId = params?.['_id']
      this.productId && this.shopService.getProduct(this.productId).subscribe((res)=>{
        if(res){
          this.productDetails = res
        }
      })
    })

    //for refresh removal from local
    let cartData = localStorage.getItem('localCart')
    if(this.productId && cartData){
      let items = JSON.parse(cartData)
          items = items.filter((item:Product)=>this.productId === item._id.toString())
          if(items.length){
            this.removeCartLink = true
          }else{
            this.removeCartLink = false
          }
      }

    let user = localStorage.getItem('customer')
    if(user){
      this.shopService.getCartCount()
      this.shopService.cartDataLength.subscribe((res)=>{
        let item = res.filter((item:Product)=>this.productId?.toString()===item.productId?.toString())
        if(item.length){
          this.cartData = item[0]
          this.removeCartLink = true
        }
      })
    }

    
    //for refresh removal of cart
    // if(this.productId){
    //   this.shopService.getCart().subscribe((res)=>{
    //     let item = res.cart.products.filter((item:any)=>item.productId===this.productId)
    //     if(item.length){
    //       this.removeCartLink = true
    //     }
    //   })
    // }

  }

  handleQuantity(val:string){
    if(this.productQuantity < 20 && val==='plus'){
      this.productQuantity+=1
    }
    if(this.productQuantity > 0 && val==='min' ){
      this.productQuantity-=1
    }
  }

  addToCart(){
    if(this.productDetails){
      this.productDetails.quantity = this.productQuantity
      if(!localStorage.getItem('customer')){
        this.shopService.addToLocal(this.productDetails)
        this.removeCartLink = true 
      }else{
        this.productDetails && this.shopService.addToCart(this.productDetails).subscribe((res)=>{
          if(res){
            // console.log(res);
            this.shopService.getCartCount()
            this.removeCartLink = true 
          }
        })
      }
    }
  }

  removeFromCart(){
    if(this.productId){
      let user = localStorage.getItem('customer')
      if(!user){
        this.productId && this.shopService.removeFromLocal(this.productId)
        this.removeCartLink = false
      }else{
        // console.log(this.productId);
        this.shopService.removeItemFromCart(this.productId).subscribe((res)=>{
        if(res){
          this.shopService.getCartCount()
          this.removeCartLink = false 
        }
      })
      }
    }
    
  }

  buyNow(){
    if(this.productDetails){
      this.productDetails.quantity = this.productQuantity
      this.productDetails && this.shopService.addToCart(this.productDetails).subscribe((res)=>{
      if(res){
        this.shopService.getCartCount()
        this.removeCartLink = true 
        this.router.navigate(['/cart'])
      }
    })
    }
  }

}
