import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../auth/token-storage.service";
import {Location} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  signupInfos: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  registerForm: FormGroup;
  roles: string[] = [];
  private authority: string;

  role: string[] = [];

  respCP: string;
  respPL: string;
  respMIND: string;
  respMAINT: string;
  admin: string;
  userMIND: string;
  userAL: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private tokenStorage: TokenStorageService,private _location: Location,private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required ]],
      password: ['', [Validators.minLength(6), Validators.required ]],
      name: ['', [Validators.minLength(4), Validators.required ]],
      email: ['', [Validators.minLength(6), Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]],
      respCP: ['',],
      respPL: ['',],
      respMIND: ['',],
      respMAINT: ['',],
      admin: ['',],
      userMIND: ['',],
      userAL: ['',],
    });


    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      const Swal = require('sweetalert2');
      var content = document.createElement('div');
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_USER_MINDOUROU') {
          this.authority = 'user_mind';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_PLACAGE') {
          this.authority = 'resp_pla';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_SCIERIE') {
          this.authority = 'resp_sci';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_BRAZIL') {
          this.authority = 'resp_bra';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_CP') {
          this.authority = 'resp_cp';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_MAINTENANCE') {
          this.authority = 'resp_maint';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_MINDOUROU') {
          this.authority = 'resp_mind';
          content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;

        }
        this.authority = 'user_alpi';
        content.innerHTML = 'Vous n\'êtes pas authorisé à accéder à cette page';
        Swal.fire({
          title: 'Aucun Accès!',
          html: content,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          focusConfirm: true,
        }).then((result) => {
          this._location.back();
        })
        return true;
      });
    }
  }

  onSubmit() {
    console.log(this.form);
    this.role = [];

    // this.signupInfo = new SignUpInfo(
    //   this.registerForm.controls['name'].value,
    //   this.registerForm.controls['username'].value,
    //   this.registerForm.controls['email'].value,
    //   this.registerForm.controls['password'].value,
    // );

    console.log('admin', this.registerForm.controls['admin'].value );
    this.respCP =  'responsable';
    this.respPL =  'responsable';
    this.respMIND =  'responsable';
    this.respMAINT =  'pm';
    this.admin =  'admin';
    this.userMIND =  'user';
    this.userAL =  'user';

    this.registerForm.controls['admin'].value != '' ? this.role.push(this.admin) : '';
    this.registerForm.controls['respCP'].value != '' ? this.role.push(this.respCP): '';
    this.registerForm.controls['respPL'].value != '' ? this.role.push(this.respPL): '';
    this.registerForm.controls['respMAINT'].value != '' ? this.role.push(this.respMAINT): '';
    this.registerForm.controls['respMIND'].value != '' ? this.role.push(this.respMIND): '';
    this.registerForm.controls['userMIND'].value != '' ? this.role.push(this.userMIND): '';
    this.registerForm.controls['userAL'].value != '' ? this.role.push(this.userAL): '';

    this.signupInfos = new SignUpInfo(
      this.registerForm.controls['name'].value,
      this.registerForm.controls['username'].value,
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
      this.role
    );

    console.log('utilisateur', this.signupInfos)

    this.authService.signUp(this.signupInfos).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/utilisateurs')
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
          title: 'Ajout avec succès',
          text: data
        })
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
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
          title: "Echec d\'enregistrement"
        })
      }
    );
  }
}
