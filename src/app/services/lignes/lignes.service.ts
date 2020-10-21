import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import {Observable} from "rxjs";
import {Ligne} from "../../Models/lignes";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LignesService {

  constructor(private  http: HttpClient) {}

  //on retourne un observable
  getLignes(): Observable<any>{
     return this.http.get(environment.LIGNE_URL);
  }

  getAllLignes(): Observable<any>{
     return this.http.get(environment.LIGNE_URL + `/all`);
  }

  addLigne(ligne: Ligne): Observable<any>{
     return this.http.post(environment.LIGNE_URL, ligne);
  }

  updateLigne(ligne: Ligne): Observable<any>{
     return this.http.put(environment.LIGNE_URL, ligne);
  }

  deleteLigne(id: number): Observable<any>{
     return this.http.delete(environment.LIGNE_URL + `/${id}`);
  }

  showLigne(id: number): Observable<any>{
     return this.http.get(environment.LIGNE_URL + `/${id}`);
  }
}
