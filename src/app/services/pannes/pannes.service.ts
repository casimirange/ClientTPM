import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Pannes} from "../../Models/pannes";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PannesService {

  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();

  constructor(private http: HttpClient) { }

  getPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL);
  }

  getAllPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/all`);
  }

  getOpPannes(numero: string): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/operateur/${numero}`);
  }

  getDetailsPannes(numero: string): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/details/${numero}`);
  }

  getOutilsPannes(numero: string): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/outils/${numero}`);
  }

  getTechPannes(numero: string): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/tech/${numero}`);
  }

  deleteTechPannes(numero: number): Observable<any>{
    return this.http.delete(environment.PANNES_URL + `/tech/${numero}`);
  }

  getHeurePannes(numero: string): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/heure/${numero}`);
  }

  getTimePannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/heure`);
  }

  getTodayPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/today`);
  }

  getHierPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/hier`);
  }

  getThisWeekPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/csem`);
  }

  getLastWeekPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/semp`);
  }

  getThisMonthPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/thisMonth`);
  }

  getLastMonthPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/lastMonth`);
  }

  getThisYearPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/thisYear`);
  }

  getLastYearPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/lastYear`);
  }

  getRangeDatePannes(d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/Date_range?debut=${d1}&fin=${d2}`);
  }

  getUnfinishedPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/unfinished`);
  }

  getCountThisPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/countThisMonth`);
  }

  getCountLastPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/countLastMonth`);
  }

  getCountRangePannes(d1: Date, d2: Date): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/countRangeMonth?debut=${d1}&fin=${d2}`);
  }

  getCountDepPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/countDep`);
  }

  getCountTodayPannes(): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/countoday`);
  }

  addPannes(panne: Pannes ): Observable<any>{
    return this.http.post(environment.PANNES_URL, panne);
  }

  updatePannes(panne: Pannes): Observable<any>{
    return this.http.put(environment.PANNES_URL, panne);
  }

  deletePannes(numero: string): Observable<any>{
    return this.http.delete(environment.PANNES_URL + `/${numero}`);
  }

  showPannes(numero: string): Observable<any>{
    return this.http.get(environment.PANNES_URL + `/${numero}`);
  }

  activePanne(numero: string): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/${numero}`, '');
  }

  updateEtat(numero: string): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/etat/${numero}`, '');
  }

  updateHeureArret(numero: string, quart: number,  HA: Date, DI: Date, FI: Date): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/periode/${numero}/${quart}?heureArret=${HA}&debutInter=${DI}&finInter=${FI}`, '');
  }

  updateOutils(numero: string, quart: number,  outil: string, qte: number, ref: string): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/outils/${numero}/${quart}?outil=${outil}&qte=${qte}&ref=${ref}`, '');
  }

  updateDate(numero: string, date: Date): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/date/${numero}?date=${date}`, '');
  }

  updateDescription(numero: string, description: string): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/description/${numero}?description=${description}`, '');
  }

  updateCause(numero: string, quart: number,  cause: string): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/cause/${numero}/${quart}?cause=${cause}`, '');
  }

  updateDetails(numero: string, quart: number,  details: string): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/details/${numero}/${quart}?details=${details}`, '');
  }

  updateOperateur(numero: string, quart: number,  idOp: number): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/operateur/${numero}/${quart}?operateur=${idOp}`, '');
  }

  updateMachine(numero: string,  idOp: number): Observable<any>{
    return this.http.put(environment.PANNES_URL+ `/machine/${numero}?machine=${idOp}`, '');
  }

  updateTechPannes(numero: number): Observable<any>{
    return this.http.delete(environment.PANNES_URL + `/technicien/${numero}`);
  }

  addTech(numero: string, quart: number,  idTec: number): Observable<any>{
    return this.http.post(environment.PANNES_URL+ `/technicien/${numero}/${quart}?tec=${idTec}`, '');
  }
}
