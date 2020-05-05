import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Technicien} from "../../Models/techniciens";

@Injectable({
  providedIn: 'root'
})
export class TechniciensService {

  constructor(private http: HttpClient) { }

  //on retourne un observable
  getTechniciens(): Observable<any>{
    return this.http.get(API_URLS.TECHNICIEN_URL);
  }
  getActiveTechniciens(): Observable<any>{
    return this.http.get(API_URLS.TECHNICIEN_URL+ `/active`);
  }

  getDesactiveTechniciens(): Observable<any>{
    return this.http.get(API_URLS.TECHNICIEN_URL+ `/desactive`);
  }

  addTech(technicien: Technicien ): Observable<any>{
    return this.http.post(API_URLS.TECHNICIEN_URL, technicien);
  }

  updateTech(technicien: Technicien): Observable<any>{
    return this.http.put(API_URLS.TECHNICIEN_URL, technicien);
  }

  deleteTech(id: number): Observable<any>{
    return this.http.delete(API_URLS.TECHNICIEN_URL + `/${id}`);
  }

  showTech(id: number): Observable<any>{
    return this.http.get(API_URLS.TECHNICIEN_URL + `/${id}`);
  }

  activeTech(matricule: number): Observable<any>{
    return this.http.put(API_URLS.TECHNICIEN_URL+ `/${matricule}`, '');
  }

}
