import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/dataTypes';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{

  public paramsData: string | undefined
  public allSearchedProducts: Product[] | undefined
  public noResultsMsg: string | undefined

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      this.paramsData = params?.['params']
      this.paramsData && this.shopService.searchProducts(this.paramsData).subscribe((res)=>{
        if(res && res.length){
          this.allSearchedProducts = res
        }else if(this.allSearchedProducts===undefined){
          console.log(this.allSearchedProducts);
          
          this.noResultsMsg = 'No Results Found'
        }
      })
      
    })
  }


}
