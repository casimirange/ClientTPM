import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getCountPerDayPannes(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/`);
  }
  getCountDepPannes(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/count`);
  }
  CountThisYear(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/countThisYear`);
  }
  CountPastMonth(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/countPassMonth`);
  }
  getmdtByYearAlpi(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/mdtByYearAlpi`);
  }
  getmdtThisYearAlpi(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/mdtThisYearAlpi`);
  }
  mtbfByYearAlpi(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/mtbfByYear`);
  }
  mtbfThisYearAlpi(): Observable<any>{
    return this.http.get(API_URLS.DASHBOARD_URL + `/mtbfThisYear`);
  }
}
