import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../configs/api.url.configs";
import {Departement} from '../Models/departement';

@Injectable({
  // providedIn: 'root'
})
export class DepartementsService {

  constructor(private http: HttpClient) { }

  //on retourne un observable
  getDepartements(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL);
  }

  addDep(departement: Departement): Observable<any>{
    return this.http.post(API_URLS.DEPARTEMENT_URL, departement);
  }

  updateDep(departement: Departement): Observable<any>{
    return this.http.put(API_URLS.DEPARTEMENT_URL, departement);
  }

  deleteDep(id: number): Observable<any>{
    return this.http.delete(API_URLS.DEPARTEMENT_URL + `/${id}`);
  }

  showDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/${id}`);
  }

}
