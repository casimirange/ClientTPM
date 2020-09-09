import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
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

  // private roles: string[];
  private authority: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private fb: FormBuilder,private router: Router,) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required ]],
      password: ['', [Validators.minLength(6), Validators.required ]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmits() {
    console.log(this.form);
    console.log(this.loginForm);

    this.loginInfo = new AuthLoginInfo(
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value,
      // this.form.username,
      // this.form.password
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
        const Swal = require('sweetalert2');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: data.username,
          text: 'connecté !'
        })
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        const Swal = require('sweetalert2');
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          background: '#f7d3dc',
          timer: 10000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'error',
          text: error.error.message,
          title: "Echec de connexion"
        })
      }
    );
  }

  reloadPage() {
    // window.location.reload();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          this.router.navigateByUrl('/machines')
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          this.router.navigateByUrl('/dashboard')
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        } else if (role === 'ROLE_RESPONSABLE') {
          this.authority = 'responsable';
          return false;
        }
        this.authority = 'user';
        this.router.navigateByUrl('/pannes')
        return true;
      });
    }
    // this.router.navigateByUrl('/dashboard')
  }
}
