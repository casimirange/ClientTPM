import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any>{
    return this.http.get(API_URLS.ROLES_URL);
  }
}
