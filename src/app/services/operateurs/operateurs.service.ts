import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {Operateur} from "../../Models/operateurs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OperateursService {

  constructor(private http: HttpClient) { }

  getOperateurs(): Observable<any>{
    return this.http.get(environment.OPERATEUR_URL);
  }

  addOp(operateur: Operateur ): Observable<any>{
    return this.http.post(environment.OPERATEUR_URL, operateur);
  }

  updateOp(operateur: Operateur): Observable<any>{
    return this.http.put(environment.OPERATEUR_URL, operateur);
  }

  deleteOp(matricule: number): Observable<any>{
    return this.http.delete(environment.OPERATEUR_URL + `/${matricule}`);
  }

  showTech(id: number): Observable<any>{
    return this.http.get(environment.OPERATEUR_URL + `/${id}`);
  }
  getActiveOperateurs(): Observable<any>{
    return this.http.get(environment.OPERATEUR_URL+ `/active`);
  }

  getDesactiveOperateurs(): Observable<any>{
    return this.http.get(environment.OPERATEUR_URL+ `/desactive`);
  }

  activeOp(matricule: number): Observable<any>{
    return this.http.put(environment.OPERATEUR_URL+ `/${matricule}`, '');
  }
}
