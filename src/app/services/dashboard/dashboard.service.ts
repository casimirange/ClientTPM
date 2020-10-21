import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getCountPerDayPannes(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/`);
  }
  getCountRangePannes(d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/date_range?debut=${d1}&fin=${d2}`);
  }
  getCountDashLastPannes(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/dashLastMonth`);
  }
  getCountDashThisPannes(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/dashThisMonth`);
  }
  getCountDepPannes(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/count`);
  }
  CountThisYear(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/countThisYear`);
  }
  CountPastMonth(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/countPassMonth`);
  }
  recapMonths(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/recapMonth`);
  }
  mtbfByYearAlpi(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/mtbfByYear`);
  }
  mtbfAlpi(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/MTBFAlpi`);
  }
  mtbfThisYearAlpi(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/mtbfThisYear`);
  }
  statsTechniciensByMonth(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/techWT`);
  }
  statsTechniciensLastMonth(): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/techWTLastMonth`);
  }
  statsTechniciensRange(d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.DASHBOARD_URL + `/techWTRange?debut=${d1}&fin=${d2}`);
  }
}
