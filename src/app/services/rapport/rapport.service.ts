import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private http: HttpClient) { }

  getRidotto(): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto`);
  }

  getPlacage(): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/placage`);
  }

  getBrazil(): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/brazil`);
  }

  getContreplaque(): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/contreplaque`);
  }

  getScierie(): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/scierie`);
  }

  getRidottoRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridottoRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getPlacageRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/placageRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getBrazilRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/brazilRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getContreplaqueRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/contreplaqueRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getScierieRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(API_URLS.RAPPORT_URL+`/ridotto/scierieRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }
}
