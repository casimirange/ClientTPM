import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
// import {User} from "../../Models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private users = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getUsers(): Observable<any> {
    return this.http.get(this.users);
  }

  // getUsers(): Observable <any>{
  //   return this.http.get(API_URLS.USERS_URL);
  // }
  //
  // addUser(users: User ): Observable<any>{
  //   return this.http.post(API_URLS.USERS_URL + `/users`, users);
  // }
  //
  // addAdmin(users: User ): Observable<any>{
  //   return this.http.post(API_URLS.USERS_URL + `/admin`, users);
  // }
  //
  // addSuperAdmin(users: User ): Observable<any>{
  //   return this.http.post(API_URLS.USERS_URL + `/super_admin`, users);
  // }
  //
  // updateUsers(users: User): Observable<any>{
  //   return this.http.put(API_URLS.USERS_URL, users);
  // }
  //
  // deleteUsers(matricule: number): Observable<any>{
  //   return this.http.delete(API_URLS.USERS_URL + `/${matricule}`);
  // }
  //
  // showUser(matricule: number): Observable<any>{
  //   return this.http.get(API_URLS.USERS_URL + `/${matricule}`);
  // }
  //
  // findUser(username: string): Observable<any>{
  //   return this.http.get(API_URLS.USERS_URL + `/s/${username}`);
  // }


}
