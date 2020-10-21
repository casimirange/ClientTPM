import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import { CookieService } from 'ngx-cookie-service';

import 'rxjs';
import {Store} from "@ngrx/store";
// import {PrincipalState} from "../../Models/principal.state";
// import {SAVE_PRINCIPAL} from '../../Models/save.principal.action'
import {Observable} from "rxjs";
import {AuthLoginInfo} from "../../Models/auth/login-info";
import {JwtResponse} from "../../Models/auth/jwt-response";
import {SignUpInfo} from "../../Models/auth/signup-info";
import {environment} from "../../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;

  constructor(private http: HttpClient,
              // private cookieService: CookieService,
              // private store: Store<PrincipalState>
  ) { }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse>{
    return this.http.post<JwtResponse>(environment.LOGIN_URL, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string>{
    return this.http.post<string>(environment.SIGNUP_URL, info, httpOptions);
  }

  // authenticate(credentials, callback){
  //   if (credentials){
  //     //btoa c'est une methode javascript qui crypte le password et l'email
  //     const token  = btoa(credentials.username + ':' + credentials.password);
  //
  //     this.cookieService.set('token', token);
  //
  //     this.http.get(API_URLS.USER_ROLE_URL).subscribe(response =>{
  //       if (response && response['name']){
  //         this.authenticated = true;
  //         console.log(response);
  //         this.store.dispatch({
  //           type: SAVE_PRINCIPAL,
  //           payload: response
  //         });
  //       } else {
  //         this.authenticated = false;
  //       }
  //       return callback && callback();
  //     });
  //   }else {
  //     this.authenticated = false;
  //   }
  // }
  //
  // logout(callback){
  //   return callback && callback();
  // }
}
