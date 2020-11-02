import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  constructor(private http: HttpClient) { }

  getRidottos(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos`);
  }

  getRidotto(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto`);
  }

  getPlacage(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/placage`);
  }

  getBrazil(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/brazil`);
  }

  getContreplaque(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/contreplaque`);
  }

  getScierie(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/scierie`);
  }

  getPlacages(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/placage`);
  }

  getBrazils(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/brazil`);
  }

  getContreplaques(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/contreplaque`);
  }

  getScieries(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/scierie`);
  }

  getRidottoRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottoRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getRidottoRanges(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottoRanges?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getPlacageRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/placageRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getBrazilRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/brazilRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getContreplaqueRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/contreplaqueRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getScierieRange(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridotto/scierieRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getPlacageRanges(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/placageRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getBrazilRanges(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/brazilRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getContreplaqueRanges(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/contreplaqueRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  getScierieRanges(d1: Date, d2: Date, d3: Date, d4: Date): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/ridottos/scierieRange?debut1=${d1}&fin1=${d2}&debut2=${d3}&fin2=${d4}`);
  }

  MTBF(): Observable<any>{
    return this.http.get(environment.RAPPORT_URL+`/MTBFAlpi`);
  }
}
