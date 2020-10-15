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

  getHierArret(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/hier`);
  }

  getThisYearArret(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/thisYear`);
  }

  getThisMonthArret(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/thisMonth`);
  }

  getLastMonthArret(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/lastMonth`);
  }

  getRangeArret(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/RangeArret?debut=${d1}&fin=${d2}`);
  }

  getArretTypeThisMonth(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/typeThisMonth`);
  }

  getArretTypeLastMonth(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/typeLastMonth`);
  }

  getArretTypeRange(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/typeRange?debut=${d1}&fin=${d2}`);
  }

  postArret(arret: Arrets ): Observable<any>{
    return this.http.post(API_URLS.ARRETS_URL, arret);
  }

  putArret(arret: Arrets, numero: string ): Observable<any>{
    return this.http.put(API_URLS.ARRETS_URL + `/${numero}`, arret);
  }

  deleteArret(id: number): Observable<any>{
    return this.http.delete(API_URLS.ARRETS_URL + `/${id}`);
  }

  getCountPerDayPannes(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/dashLAst30Day`);
  }
  getCountRangePannes(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/date_range?debut=${d1}&fin=${d2}`);
  }
  getCountDashLastPannes(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/dashLastMonth`);
  }
  getCountDashThisPannes(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/dashThisMonth`);
  }
  getRecapArret(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/recapArret`);
  }

  paretoAlpiThisMonth(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/paretoAlpiThisMonth`);
  }

  paretoAlpiLastMonth(): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/paretoAlpiLastMonth`);
  }

  paretoAlpiRange(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.ARRETS_URL + `/paretoAlpiRange?debut=${d1}&fin=${d2}`);
  }
}
