import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_URLS} from "../../configs/api.url.configs";
import {Machine} from "../../Models/machines";

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  constructor(private  http: HttpClient) { }

  //on retourne un observable
  getMachines(): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL);
  }

  addMachine(ligne: Machine): Observable<any>{
    return this.http.post(API_URLS.MACHINE_URL, ligne);
  }

  updateMachine(ligne: Machine): Observable<any>{
    return this.http.put(API_URLS.MACHINE_URL, ligne);
  }

  deleteMachine(id: number): Observable<any>{
    return this.http.delete(API_URLS.MACHINE_URL + `/${id}`);
  }

  showMachine(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/${id}`);
  }

  getAllMachinesByDepartment(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/departement/${id}`);
  }

  historiquePannes(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/pannes/${id}`);
  }

  hourThisMonthDep(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/hour/ThisMonth/${id}`);
  }

  hourLastMonthDep(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/hour/LastMonth/${id}`);
  }

  mtbfByYear(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/mtbfByYear/${id}`);
  }

  mtbfThisYear(id: number): Observable<any>{
    return this.http.get(API_URLS.MACHINE_URL + `/mtbfThisYear/${id}`);
  }
}
