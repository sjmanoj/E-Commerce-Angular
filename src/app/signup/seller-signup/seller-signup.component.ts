import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SellerSignupService } from '../../services/seller-signup.service';
import { Router } from '@angular/router';
import { Signup } from '../../models/dataTypes';

@Component({
  selector: 'app-seller-signup',
  templateUrl: './seller-signup.component.html',
  styleUrl: './seller-signup.component.css'
})
export class SellerSignupComponent implements OnInit{

  public signupMsg: string = ''

  constructor(private fb: FormBuilder, private signupService: SellerSignupService, private router: Router){}

  signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.signupService.reloadSeller()
  }
  
  onSignup(){
    let userData = this.signupForm.value as Signup
    this.signupService.signupUser(userData).subscribe((res)=>{
      // console.log(res);
      if(res){
        this.signupMsg = `You Have Successfully Signed Up, Please Login`
        this.signupForm.reset()
      }
    }, (err)=>{
      // console.warn(err.error.message);
      this.signupMsg = err.error.msg
      this.signupForm.reset()
    })
    
  }

  onLogin(){
    let userData = this.loginForm.value as Signup
    this.signupService.loginUser(userData)
    this.signupService.signupMsg.subscribe((res)=>{
      if(res){
        // console.log(res);
        this.signupMsg = "Please Enter Valid Credentails"
        this.loginForm.reset()
      }
    })
  }
}
