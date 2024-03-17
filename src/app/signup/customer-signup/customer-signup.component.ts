import { Component, OnInit } from '@angular/core';
import { Cart, Product, Signup } from '../../models/dataTypes';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerSignupService } from '../../services/customer-signup.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-customer-signup',
  templateUrl: './customer-signup.component.html',
  styleUrl: './customer-signup.component.css'
})
export class CustomerSignupComponent implements OnInit{

  public signupMsg: string = ''

  constructor(private fb: FormBuilder, private router: Router, private signupService: CustomerSignupService,
    private shopService: ShopService){}

  customerSignupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  customerLoginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.signupService.reloadSeller()
  }

  onSignup(){
    let userData = this.customerSignupForm.value as Signup
    this.signupService.signupUser(userData).subscribe((res)=>{
      // console.log(res);
      if(res){
        this.signupMsg = `You Have Successfully Signed Up, Please Login`
        this.customerSignupForm.reset()
      }
    }, (err)=>{
      // console.warn(err.error.message);
      this.signupMsg = err.error.msg
      this.customerSignupForm.reset()
    })
    
  }

  onLogin(){
    let userData = this.customerLoginForm.value as Signup
    this.signupService.loginUser(userData)
    
    this.signupService.signupMsg.subscribe((res)=>{
      if(res){
        // console.log(res);
        this.signupMsg = "Please Enter Valid Credentails"
        this.customerLoginForm.reset()
      }
      
    })
  }
  
  
}
