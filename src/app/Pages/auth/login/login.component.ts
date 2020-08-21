import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";
import {AuthLoginInfo} from "../../../Models/auth/login-info";
import {TokenStorageService} from "../../../services/auth/token storage/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  loginForm: FormGroup;

  credentials = {
    username: '',
    password: ''
  };


  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.minLength(4), Validators.required ]],
      password: ['', [Validators.minLength(4), Validators.required ]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    // if(this.tokenStorage.getToken()){
    //   console.log('url en cours '+this.router.url);
    //   this.router.navigateByUrl(this.router.url);
    // }
  }

  onSubmit() {
    console.log(this.loginForm);

    this.loginInfo = new AuthLoginInfo(
        // this.form.username,
        // this.form.password
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value,
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.reloadPage();

        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
    );
  }

  reloadPage() {
    // window.location.reload();
    this.router.navigateByUrl('/home')
  }

  // logins(){
  //   // console.log('email:'+ this.loginForm.controls['email'].value)
  //   // console.log('pass:'+ this.loginForm.controls['pass'].value)
  //
  //   this.authService.authenticate(this.credentials, ()=>{
  //     this.router.navigateByUrl('/dashboard')
  //   })
  // }

}
