import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";

@Injectable({
  providedIn: 'root'
})
export class AlpicamService {

  constructor(private http: HttpClient) { }

  getTypePanneThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/typePanneThisYear`);
  }
}
