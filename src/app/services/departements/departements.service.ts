import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Departement} from '../../Models/departement';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DepartementsService {

  constructor(private http: HttpClient) { }

  //on retourne un observable
  getDepartements(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL);
  }

  getAllDepartements(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL+ `/all`);
  }

  getDashboard(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/dashboard/${id}`);
  }

  getDashboardRange(id: number, d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/dashboardRange/${id}?debut=${d1}&fin=${d2}`);
  }

  getDashboardThisMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/dashboardThisMonth/${id}`);
  }

  getDashboardLastMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/dashboardLastMonth/${id}`);
  }

  addDep(departement: Departement): Observable<any>{
    return this.http.post(environment.DEPARTEMENT_URL, departement);
  }

  updateDep(departement: Departement): Observable<any>{
    return this.http.put(environment.DEPARTEMENT_URL, departement);
  }

  deleteDep(id: number): Observable<any>{
    return this.http.delete(environment.DEPARTEMENT_URL + `/${id}`);
  }

  showDep(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/${id}`);
  }

  showPannesDep(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/pannes/${id}`);
  }

  getTodayPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/today/${id}`);
  }

  getHierPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/hier/${id}`);
  }

  getThisWeekPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/csem/${id}`);
  }

  getLastWeekPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/semp/${id}`);
  }

  getThisMonthPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/thisMonth/${id}`);
  }

  getLastMonthPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/lastMonth/${id}`);
  }

  getThisYearPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/thisYear/${id}`);
  }

  getLastYearPannes(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/lastYear/${id}`);
  }

  getRangeDatePannes(id: number, d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/Date_range/${id}?debut=${d1}&fin=${d2}`);
  }

  countThisMonthPannesDep(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/pannes/countThisMonth/${id}`);
  }

  countLastMonthPannesDep(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/pannes/countLastMonth/${id}`);
  }

  hourThisMonthDep(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/hour/ThisMonth/${id}`);
  }

  hourLastMonthDep(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/hour/LastMonth/${id}`);
  }

  mtbfByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/mtbfByYear/${id}`);
  }

  mtbfThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/mtbfThisYear/${id}`);
  }

  paretoDepRange(id: number, d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDepRange/${id}?debut=${d1}&fin=${d2}`);
  }

  paretoThisMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDepThisMonth/${id}`);
  }

  paretoLastMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDepLastMonth/${id}`);
  }

  ligne1ThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ligne1MtbfThisYear/${id}`);
  }

  ligne1ByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ligne1MtbfByYear/${id}`);
  }

  ligne2ThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ligne2MtbfThisYear/${id}`);
  }

  ligne2ByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ligne2MtbfByYear/${id}`);
  }

  ligne3ThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ligne3MtbfThisYear/${id}`);
  }

  ligne3ByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ligne3MtbfByYear/${id}`);
  }

  sechoirThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/sechoirMtbfThisYear/${id}`);
  }

  sechoirByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/sechoirMtbfByYear/${id}`);
  }

  ecorcageThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ecorcageMtbfThisYear/${id}`);
  }

  ecorcageByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/ecorcageMtbfByYear/${id}`);
  }

  encollageBrazilThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/encollageBrazilMtbfThisYear/${id}`);
  }

  encollageBrazilByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/encollageBrazilMtbfByYear/${id}`);
  }

  encollageCPThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/encollageCPMtbfThisYear/${id}`);
  }

  encollageCPByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/encollageCPMtbfByYear/${id}`);
  }

  teintureThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/teintureMtbfThisYear/${id}`);
  }

  teintureByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/teintureMtbfByYear/${id}`);
  }

  tranchageThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/tranchageMtbfThisYear/${id}`);
  }

  tranchageByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/tranchageMtbfByYear/${id}`);
  }

  ponçageThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/poncageMtbfThisYear/${id}`);
  }

  ponçageByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/poncageMtbfByYear/${id}`);
  }

  pressageThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/pressageMtbfThisYear/${id}`);
  }

  pressageByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/pressageMtbfByYear/${id}`);
  }

  jointageThisYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/jointageMtbfThisYear/${id}`);
  }

  jointageByYear(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/jointageMtbfByYear/${id}`);
  }

  paretoDerouleuseTDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDerouleuseTDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoDerouleuseTDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDerouleuseTDTThisMonth`);
  }

  paretoDerouleuseTDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDerouleuseTDTLastMonth`);
  }

  paretoDerouleuseMDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDerouleuseMDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoDerouleuseMDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDerouleuseMDTThisMonth`);
  }

  paretoDerouleuseMDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoDerouleuseMDTLastMonth`);
  }

  paretoBobineuseTDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoBobineuseTDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoBobineuseTDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoBobineuseTDTThisMonth`);
  }

  paretoBobineuseTDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoBobineuseTDTLastMonth`);
  }

  paretoBobineuseMDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoBobineuseMDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoBobineuseMDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoBobineuseMDTThisMonth`);
  }

  paretoBobineuseMDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoBobineuseMDTLastMonth`);
  }

  paretoMagasinBobineTDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMagasinBobineTDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoMagasinBobineTDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMagasinBobineTDTLastMonth`);
  }

  paretoMagasinBobineTDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMagasinBobineTDTThisMonth`);
  }

  paretoMagasinBobineMDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMagasinBobineMDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoMagasinBobineMDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMagasinBobineMDTLastMonth`);
  }

  paretoMagasinBobineMDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMagasinBobineMDTThisMonth`);
  }

  paretoMassicotTDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMassicotTDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoMassicotTDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMassicotTDTLastMonth`);
  }

  paretoMassicotTDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMassicotTDTThisMonth`);
  }

  paretoMassicotMDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMassicotMDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoMassicotMDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMassicotMDTLastMonth`);
  }

  paretoMassicotMDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoMassicotMDTThisMonth`);
  }

  paretoSechoirTDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoSechoirTDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoSechoirTDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoSechoirTDTLastMonth`);
  }

  paretoSechoirTDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoSechoirTDTThisMonth`);
  }

  paretoSechoirMDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoSechoirMDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoSechoirMDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoSechoirMDTLastMonth`);
  }

  paretoSechoirMDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoSechoirMDTThisMonth`);
  }

  paretoTrancheuseTDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoTrancheuseTDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoTrancheuseTDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoTrancheuseTDTLastMonth`);
  }

  paretoTrancheuseTDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoTrancheuseTDTThisMonth`);
  }

  paretoTrancheuseMDTRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoTrancheuseMDTRange?debut=${d1}&fin=${d2}`);
  }

  paretoTrancheuseMDTLastMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoTrancheuseMDTLastMonth`);
  }

  paretoTrancheuseMDTThisMonth(): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoTrancheuseMDTThisMonth`);
  }

  paretoEncolleuseTDTRange(id: number, d1:Date, d2:Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoEncolleuseTDTRange/${id}?debut=${d1}&fin=${d2}`);
  }

  paretoEncolleuseTDTThisMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoEncolleuseTDTThisMonth/${id}`);
  }

  paretoEncolleuseTDTLastMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoEncolleuseTDTLastMonth/${id}`);
  }

  paretoEncolleuseMDTRange(id: number, d1:Date, d2:Date): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoEncolleuseMDTRange/${id}?debut=${d1}&fin=${d2}`);
  }

  paretoEncolleuseMDTThisMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoEncolleuseMDTThisMonth/${id}`);
  }

  paretoEncolleuseMDTLastMonth(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/paretoEncolleuseMDTLastMonth/${id}`);
  }

  year(id: number): Observable<any>{
    return this.http.get(environment.DEPARTEMENT_URL + `/countThisYear/${id}`);
  }


}
