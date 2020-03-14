import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import {Observable} from "rxjs";
import {Ligne} from "../../Models/lignes";

@Injectable({
  providedIn: 'root'
})
export class LignesService {

  constructor(private  http: HttpClient) {}

  //on retourne un observable
  getLignes(): Observable<any>{
     return this.http.get(API_URLS.LIGNE_URL);
  }

  addLigne(ligne: Ligne): Observable<any>{
     return this.http.post(API_URLS.LIGNE_URL, ligne);
  }

  updateLigne(ligne: Ligne): Observable<any>{
     return this.http.put(API_URLS.LIGNE_URL, ligne);
  }

  deleteLigne(id: number): Observable<any>{
     return this.http.delete(API_URLS.LIGNE_URL + `/${id}`);
  }

  showLigne(id: number): Observable<any>{
     return this.http.get(API_URLS.LIGNE_URL + `/${id}`);
  }
}
