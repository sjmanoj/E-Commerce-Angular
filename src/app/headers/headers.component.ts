import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerSignupService } from '../services/seller-signup.service';
import { CustomerSignupService } from '../services/customer-signup.service';
import { ShopService } from '../services/shop.service';
import { Product } from '../models/dataTypes';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.css'
})
export class HeadersComponent implements OnInit{

  public menuType: string = 'default';
  public userName: string = ''
  public isHidden: boolean = false
  public searchResults: undefined | Product[] 
  public cartCount: number = 0

  constructor(private router: Router, private sellerSignupService: SellerSignupService, 
    private customerSignupService: CustomerSignupService, private shopService: ShopService){}

  ngOnInit(): void {
    this.router.events.subscribe((res:any)=>{
      if(res.url){
        let sellerStore = localStorage.getItem('admin')
        let sellerData = sellerStore && JSON.parse(sellerStore)

        let customerStore = localStorage.getItem('customer')
        let customerData = customerStore && JSON.parse(customerStore)

    if(sellerData && res.url.includes('products')){
      this.sellerSignupService.getUser(sellerData).subscribe((res)=>{
        this.userName = res.username
        this.menuType = 'seller'
      })
    }else if(customerData){
      this.customerSignupService.getUser(customerData).subscribe((res)=>{
        this.userName = res.username
        this.menuType = 'customer'
      })
    }else{
      this.menuType = 'default'
    }
    }
    })


    //To increase cart length
    let cartData = localStorage.getItem('localCart')
    if(cartData){
      this.cartCount = JSON.parse(cartData).length
    }

    //For immediate cart length
    let user = localStorage.getItem('customer')
    if (user){
      this.shopService.getCartCount()
    }
    this.shopService.cartDataLength.subscribe((res)=>{
      this.cartCount = res.length
      // console.log(res);
    })
    
  }

  onCustomerLogout(){
    localStorage.removeItem('customer')
    this.router.navigate(['/'])
    this.shopService.cartDataLength.emit([])
  }

  onSellerLogout(){
    localStorage.removeItem('admin')
    this.router.navigate(['/'])
  }

  onSearch(searchVal: string){
    this.router.navigate([`/search/${searchVal}`])
  }

  searchProduct(queryEventData: KeyboardEvent){
    if(queryEventData){
      let element = queryEventData.target as HTMLInputElement
      this.shopService.searchProducts(element.value).subscribe((res)=>{
        if(res.length>5){
          res.length = 5
        } 
        this.searchResults = res
      })
    }
    
  }
  
  hideSearch(){
    this.searchResults = undefined
  }

  redirectToDetails(productId: string){
    this.router.navigate([`/product-details/${productId}`])
  }


}
