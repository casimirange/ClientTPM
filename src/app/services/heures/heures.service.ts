import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import {Heures} from "../../Models/heures";

@Injectable({
  providedIn: 'root'
})
export class HeuresService {

  constructor(private http: HttpClient) { }

  getHeures(): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/all`);
  }

  addHeure(heure: Heures): Observable<any>{
    return this.http.post(API_URLS.HEURES_URL, heure);
  }

  updateHeure(heure: Heures): Observable<any>{
    return this.http.put(API_URLS.HEURES_URL, heure);
  }

  deleteDep(id: number): Observable<any>{
    return this.http.delete(API_URLS.HEURES_URL + `/${id}`);
  }
}
