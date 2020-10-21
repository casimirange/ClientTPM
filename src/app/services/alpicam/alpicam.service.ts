import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AlpicamService {

  constructor(private http: HttpClient) { }

  getTypePanneThisMonth(): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/typePanneThisMonth`);
  }

  getTypePanneLastMonth(): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/typePanneLastMonth`);
  }

  getTypePanneRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/typePanneRange?debut=${d1}&fin=${d2}`);
  }

  getRecapPanne(): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/recapPanne`);
  }

  paretoAlpiThisMonth(): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/paretoAlpiThisMonth`);
  }

  paretoAlpiLastMonth(): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/paretoAlpiLastMonth`);
  }

  paretoAlpiRange(d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.ALPICAM_URL + `/paretoAlpiRange?debut=${d1}&fin=${d2}`);
  }
}
