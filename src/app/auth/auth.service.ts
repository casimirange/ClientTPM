import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'https://acon-stats-server.herokuapp.com/api/auth/signin';
  private signupUrl = 'https://acon-stats-server.herokuapp.com/api/auth/signup';
  private users = 'https://acon-stats-server.herokuapp.com/api/auth';

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(environment.LOGIN_URL, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(environment.SIGNUP_URL, info, httpOptions);
  }

  updateUser(info: SignUpInfo, id: number): Observable<string> {
    return this.http.put<string>(environment.URERS+ `/${id}`, info, httpOptions);
  }

  deleteUser(id: number): Observable<string> {
    return this.http.delete<string>(environment.URERS+ `/${id}`, httpOptions);
  }

  getUsers(): Observable<string> {
    return this.http.get<string>(environment.URERS);
  }
}
