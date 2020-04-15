import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {User} from "../../Models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable <any>{
    return this.http.get(API_URLS.USERS_URL);
  }

  addUser(user: User ): Observable<any>{
    return this.http.post(API_URLS.USERS_URL + `/user`, user);
  }

  addAdmin(user: User ): Observable<any>{
    return this.http.post(API_URLS.USERS_URL + `/admin`, user);
  }

  addSuperAdmin(user: User ): Observable<any>{
    return this.http.post(API_URLS.USERS_URL + `/super_admin`, user);
  }

  updateUsers(user: User): Observable<any>{
    return this.http.put(API_URLS.USERS_URL, user);
  }

  deleteUsers(matricule: number): Observable<any>{
    return this.http.delete(API_URLS.USERS_URL + `/${matricule}`);
  }

  showUser(matricule: number): Observable<any>{
    return this.http.get(API_URLS.USERS_URL + `/${matricule}`);
  }

  findUser(username: string): Observable<any>{
    return this.http.get(API_URLS.USERS_URL + `/s/${username}`);
  }
}
