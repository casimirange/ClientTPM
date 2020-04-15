import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import { CookieService } from 'ngx-cookie-service';

import 'rxjs';
import {Store} from "@ngrx/store";
import {PrincipalState} from "../../Models/principal.state";
import {SAVE_PRINCIPAL} from '../../Models/save.principal.action'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean = false;

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private store: Store<PrincipalState>
  ) { }

  authenticate(credentials, callback){
    if (credentials){
      //btoa c'est une methode javascript qui crypte le password et l'email
      const token  = btoa(credentials.username + ':' + credentials.password);

      this.cookieService.set('token', token);

      this.http.get(API_URLS.USER_ROLE_URL).subscribe(response =>{
        if (response && response['name']){
          this.authenticated = true;
          console.log(response);
          this.store.dispatch({
            type: SAVE_PRINCIPAL,
            payload: response
          });
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
    }else {
      this.authenticated = false;
    }
  }

  logout(callback){
    return callback && callback();
  }
}
