import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Departement} from '../../Models/departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementsService {

  constructor(private http: HttpClient) { }

  //on retourne un observable
  getDepartements(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL);
  }

  getDashboard(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/dashboard/${id}`);
  }

  addDep(departement: Departement): Observable<any>{
    return this.http.post(API_URLS.DEPARTEMENT_URL, departement);
  }

  updateDep(departement: Departement): Observable<any>{
    return this.http.put(API_URLS.DEPARTEMENT_URL, departement);
  }

  deleteDep(id: number): Observable<any>{
    return this.http.delete(API_URLS.DEPARTEMENT_URL + `/${id}`);
  }

  showDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/${id}`);
  }

  showPannesDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/pannes/${id}`);
  }

  countThisMonthPannesDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/pannes/countThisMonth/${id}`);
  }

  countLastMonthPannesDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/pannes/countLastMonth/${id}`);
  }

  hourThisMonthDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/hour/ThisMonth/${id}`);
  }

  hourLastMonthDep(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/hour/LastMonth/${id}`);
  }

  mtbfByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/mtbfByYear/${id}`);
  }

  mtbfThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/mtbfThisYear/${id}`);
  }

  paretoThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoDepYear/${id}`);
  }

  paretoThisMonth(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoDepThisMonth/${id}`);
  }

  ligne1ThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ligne1MtbfThisYear/${id}`);
  }

  ligne1ByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ligne1MtbfByYear/${id}`);
  }

  ligne2ThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ligne2MtbfThisYear/${id}`);
  }

  ligne2ByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ligne2MtbfByYear/${id}`);
  }

  ligne3ThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ligne3MtbfThisYear/${id}`);
  }

  ligne3ByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ligne3MtbfByYear/${id}`);
  }

  sechoirThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/sechoirMtbfThisYear/${id}`);
  }

  sechoirByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/sechoirMtbfByYear/${id}`);
  }

  ecorcageThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ecorcageMtbfThisYear/${id}`);
  }

  ecorcageByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/ecorcageMtbfByYear/${id}`);
  }

  encollageBrazilThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/encollageBrazilMtbfThisYear/${id}`);
  }

  encollageBrazilByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/encollageBrazilMtbfByYear/${id}`);
  }

  encollageCPThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/encollageCPMtbfThisYear/${id}`);
  }

  encollageCPByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/encollageCPMtbfByYear/${id}`);
  }

  teintureThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/teintureMtbfThisYear/${id}`);
  }

  teintureByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/teintureMtbfByYear/${id}`);
  }

  tranchageThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/tranchageMtbfThisYear/${id}`);
  }

  tranchageByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/tranchageMtbfByYear/${id}`);
  }

  ponçageThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/poncageMtbfThisYear/${id}`);
  }

  ponçageByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/poncageMtbfByYear/${id}`);
  }

  pressageThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/pressageMtbfThisYear/${id}`);
  }

  pressageByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/pressageMtbfByYear/${id}`);
  }

  jointageThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/jointageMtbfThisYear/${id}`);
  }

  jointageByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/jointageMtbfByYear/${id}`);
  }

  paretoDerouleuseTDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoDerouleuseTDTThisYear`);
  }

  paretoDerouleuseTDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoDerouleuseTDTThisMonth`);
  }

  paretoDerouleuseMDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoDerouleuseMDTThisYear`);
  }

  paretoDerouleuseMDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoDerouleuseMDTThisMonth`);
  }

  paretoBobineuseTDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoBobineuseTDTThisYear`);
  }

  paretoBobineuseTDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoBobineuseTDTThisMonth`);
  }

  paretoBobineuseMDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoBobineuseMDTThisYear`);
  }

  paretoBobineuseMDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoBobineuseMDTThisMonth`);
  }

  paretoMagasinBobineTDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMagasinBobineTDTThisYear`);
  }

  paretoMagasinBobineTDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMagasinBobineTDTThisMonth`);
  }

  paretoMagasinBobineMDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMagasinBobineMDTThisYear`);
  }

  paretoMagasinBobineMDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMagasinBobineMDTThisMonth`);
  }

  paretoMassicotTDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMassicotTDTThisYear`);
  }

  paretoMassicotTDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMassicotTDTThisMonth`);
  }

  paretoMassicotMDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMassicotMDTThisYear`);
  }

  paretoMassicotMDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoMassicotMDTThisMonth`);
  }

  paretoSechoirTDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoSechoirTDTThisYear`);
  }

  paretoSechoirTDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoSechoirTDTThisMonth`);
  }

  paretoSechoirMDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoSechoirMDTThisYear`);
  }

  paretoSechoirMDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoSechoirMDTThisMonth`);
  }

  paretoTrancheuseTDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoTrancheuseTDTThisYear`);
  }

  paretoTrancheuseTDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoTrancheuseTDTThisMonth`);
  }

  paretoTrancheuseMDTThisYear(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoTrancheuseMDTThisYear`);
  }

  paretoTrancheuseMDTThisMonth(): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoTrancheuseMDTThisMonth`);
  }

  paretoEncolleuseTDTThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoEncolleuseTDTThisYear/${id}`);
  }

  paretoEncolleuseTDTThisMonth(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoEncolleuseTDTThisMonth/${id}`);
  }

  paretoEncolleuseMDTThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoEncolleuseMDTThisYear/${id}`);
  }

  paretoEncolleuseMDTThisMonth(id: number): Observable<any>{
    return this.http.get(API_URLS.DEPARTEMENT_URL + `/paretoEncolleuseMDTThisMonth/${id}`);
  }

}
