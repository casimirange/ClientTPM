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

  getThisMonthHeures(): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/thisMonth`);
  }
  getLastMonthHeures(): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/lastMonth`);
  }
  getRangeHeures(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/range?debut=${d1}&fin=${d2}`);
  }

  getMachProg(dep: string): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/machProg?dep=${dep}`);
  }

  getMachProgRange(dep: string, d1: Date): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/machProgRange?date=${d1}&dep=${dep}`);
  }

  getMachProgRangeMonth(dep: string, d1: string): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/machProgRangeMonth?date=${d1}&dep=${dep}`);
  }

  getHeuresByDep(): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/groupByDep`);
  }

  getHeuresByDepRange(d1: Date): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/groupByDepRange?date=${d1}`);
  }

  getHeuresByDepRangeMonth(d1: string): Observable<any>{
    return this.http.get(API_URLS.HEURES_URL + `/groupByDepRangeMonth?date=${d1}`);
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
