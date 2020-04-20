import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  credentials = {
    username: '',
    password: ''
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.minLength(4), Validators.required ]],
      password: ['', [Validators.minLength(4), Validators.required ]],
    })
  }

  login(){
    // console.log('email:'+ this.loginForm.controls['email'].value)
    // console.log('pass:'+ this.loginForm.controls['pass'].value)

    this.authService.authenticate(this.credentials, ()=>{
      this.router.navigateByUrl('/new-panne')
    })
  }

}
