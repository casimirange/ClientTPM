import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import {Observable} from "rxjs";
import {Arrets} from "../../Models/arrets";

@Injectable({
  providedIn: 'root'
})
export class ArretsService {

  constructor(private http: HttpClient) { }

  getAllArrets(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/all`);
  }

  getTodayArret(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/today`);
  }

  postArret(arret: Arrets ): Observable<any>{
    return this.http.post(API_URLS.ARRETS_URL, arret);
  }

  putArret(arret: Arrets ): Observable<any>{
    return this.http.put(API_URLS.ARRETS_URL, arret);
  }

  deleteArret(id: number): Observable<any>{
    return this.http.delete(API_URLS.ARRETS_URL + `/${id}`);
  }
}
