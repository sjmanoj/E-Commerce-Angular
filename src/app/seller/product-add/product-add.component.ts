import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { Product } from '../../models/dataTypes';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

  public productMsg: string | undefined

  constructor(private fb: FormBuilder, private productService: ProductsService, private router: Router){}

  productForm = this.fb.group({
    title: [''],
    price: [0],
    color: [''],
    categories: [''],
    desc: [''],
    image: [''],
    size: ['']
  })

  onSubmit(){
    let productData = this.productForm!.value as Product
    this.productService.createProduct(productData).subscribe((res)=>{
      // console.log('rf', res);
      if(res && res._id){
        this.productMsg = 'Product is successfully added'
      }     
      this.getTimeout()
    }, (err)=>{
      if(err){
        // console.log(err.message);
        this.productMsg = 'Please Add Unique Name Or Add A Valid Price'
      }
      this.getTimeout()
    })
  }

  getTimeout(){
    setTimeout(() => {
      this.productMsg = undefined
      this.productForm.reset()
    }, 4000);
  }

}
