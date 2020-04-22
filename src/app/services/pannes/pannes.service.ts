import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Pannes} from "../../Models/pannes";

@Injectable({
  providedIn: 'root'
})
export class PannesService {

  constructor(private http: HttpClient) { }

  getPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL);
  }

  getAllPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/all`);
  }

  getTechPannes(numero: number): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/all/${numero}`);
  }

  addPannes(panne: Pannes ): Observable<any>{
    return this.http.post(API_URLS.PANNES_URL, panne);
  }

  updatePannes(panne: Pannes): Observable<any>{
    return this.http.put(API_URLS.PANNES_URL, panne);
  }

  deletePannes(numero: number): Observable<any>{
    return this.http.delete(API_URLS.PANNES_URL + `/${numero}`);
  }

  showPannes(numero: number): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/${numero}`);
  }
}
