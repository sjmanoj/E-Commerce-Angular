import { Component, OnInit } from '@angular/core';
import { Cart, PriceSummary } from '../../models/dataTypes';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  public cart: Cart[] | undefined

  public priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private router: Router, private shopService: ShopService){}

  ngOnInit(): void {
    this.loadCardDetails()
  }

  loadCardDetails(){
    this.shopService.getCart().subscribe((res)=>{
      this.cart = res.cart.products
      // console.log(this.cart);
      let price = 0
      res.cart.products.forEach((item: any)=>{
        if(item.quantity && item.price){
          price+= +item.price * +item.quantity 
        }
      })
      this.priceSummary.price = price
      this.priceSummary.tax = price/10
      this.priceSummary.delivery = 100
      this.priceSummary.total = price + price/10 + 100
      // console.log(this.priceSummary.total);
      if(!this.cart?.length){
        this.router.navigate(['/'])
      }else{
        this.shopService.getCartCount()
      }
    })
  }

  removeFromCart(productId: string){
    this.shopService.removeItemFromCart(productId).subscribe((res)=>{
      this.loadCardDetails() 
    })
    
  }

  checkoutOrder(){
    this.router.navigate(['/checkout'])
  }

}
