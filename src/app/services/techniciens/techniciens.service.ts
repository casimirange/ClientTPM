import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Technicien} from "../../Models/techniciens";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TechniciensService {

  constructor(private http: HttpClient) { }

  //on retourne un observable
  getTechniciens(): Observable<any>{
    return this.http.get(environment.TECHNICIEN_URL);
  }
  getActiveTechniciens(): Observable<any>{
    return this.http.get(environment.TECHNICIEN_URL+ `/active`);
  }

  getDesactiveTechniciens(): Observable<any>{
    return this.http.get(environment.TECHNICIEN_URL+ `/desactive`);
  }

  addTech(technicien: Technicien ): Observable<any>{
    return this.http.post(environment.TECHNICIEN_URL, technicien);
  }

  updateTech(technicien: Technicien): Observable<any>{
    return this.http.put(environment.TECHNICIEN_URL, technicien);
  }

  deleteTech(id: number): Observable<any>{
    return this.http.delete(environment.TECHNICIEN_URL + `/${id}`);
  }

  showTech(id: number): Observable<any>{
    return this.http.get(environment.TECHNICIEN_URL + `/${id}`);
  }

  activeTech(matricule: number): Observable<any>{
    return this.http.put(environment.TECHNICIEN_URL+ `/${matricule}`, '');
  }

}
