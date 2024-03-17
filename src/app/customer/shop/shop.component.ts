import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  public shopProducts: Product[] | undefined

  constructor(private shopService: ShopService){}

  ngOnInit(): void {
    this.shopService.trendyProducts().subscribe((res)=>{
      if(res && res.length){
        this.shopProducts = res
      }
      
    })
    let user = localStorage.getItem('customer')
    if (user){
      this.shopService.getCartCount()
    }
  } 
}
