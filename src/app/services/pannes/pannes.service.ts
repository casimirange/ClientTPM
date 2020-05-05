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
    return this.http.get(API_URLS.PANNES_URL + `/tech/${numero}`);
  }

  getHeurePannes(numero: number): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/heure/${numero}`);
  }

  getTimePannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/heure`);
  }

  getTodayPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/today`);
  }

  getHierPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/hier`);
  }

  getThisWeekPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/csem`);
  }

  getLastWeekPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/semp`);
  }

  getThisMonthPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/thisMonth`);
  }

  getLastMonthPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/lastMonth`);
  }

  getThisYearPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/thisYear`);
  }

  getLastYearPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/lastYear`);
  }

  getRangeDatePannes(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/Date_range?debut=${d1}&fin=${d2}`);
  }

  getUnfinishedPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/unfinished`);
  }

  getCountPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/count`);
  }

  getCountTodayPannes(): Observable<any>{
    return this.http.get(API_URLS.PANNES_URL + `/countoday`);
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

  activePanne(numero: number): Observable<any>{
    return this.http.put(API_URLS.PANNES_URL+ `/${numero}`, '');
  }
}
