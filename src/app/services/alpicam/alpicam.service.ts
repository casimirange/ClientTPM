import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_URLS} from "../../configs/api.url.configs";

@Injectable({
  providedIn: 'root'
})
export class AlpicamService {

  constructor(private http: HttpClient) { }

  getTypePanneThisMonth(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/typePanneThisMonth`);
  }

  getTypePanneLastMonth(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/typePanneLastMonth`);
  }

  getTypePanneRange(d1:Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/typePanneRange?debut=${d1}&fin=${d2}`);
  }

  getRecapPanne(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/recapPanne`);
  }

  paretoAlpiThisMonth(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/paretoAlpiThisMonth`);
  }

  paretoAlpiLastMonth(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/paretoAlpiLastMonth`);
  }

  paretoAlpiRange(d1: Date, d2: Date): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/paretoAlpiRange?debut=${d1}&fin=${d2}`);
  }

  alpiThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/alpiThisYear`);
  }

  alpiLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/alpiLastYear`);
  }

  placageThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/placageThisYear`);
  }

  placageLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/placageLastYear`);
  }

  brazilThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/brazilThisYear`);
  }

  brazilLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/brazilLastYear`);
  }

  contreplaqueThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/CPThisYear`);
  }

  contreplaqueLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/CPLastYear`);
  }

  scierieThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/scierieThisYear`);
  }

  scierieLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/scierieLastYear`);
  }

  ligne1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ligne1ThisYear`);
  }

  ligne1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ligne1LastYear`);
  }

  ligne2ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ligne2ThisYear`);
  }

  ligne2LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ligne2LastYear`);
  }

  ligne3ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ligne3ThisYear`);
  }

  ligne3LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ligne3LastYear`);
  }

  sechoirsThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechoirsThisYear`);
  }

  sechoirsLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechoirsLastYear`);
  }

  jointageThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/jointageThisYear`);
  }

  jointageLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/jointageLastYear`);
  }

  ecorçageThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ecorcageThisYear`);
  }

  ecorçageLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/ecorcageLastYear`);
  }

  tapisDechetsThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/tapisDechetsThisYear`);
  }

  tapisDechetsLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/tapisDechetsLastYear`);
  }

  encollageBrazilThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encollageBrazilThisYear`);
  }

  encollageBrazilLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encollageBrazilLastYear`);
  }

  tranchageThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/tranchageThisYear`);
  }

  tranchageLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/tranchageLastYear`);
  }

  derouleuse1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/derouleuse1ThisYear`);
  }

  derouleuse1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/derouleuse1LastYear`);
  }

  derouleuse2ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/derouleuse2ThisYear`);
  }

  derouleuse2LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/derouleuse2LastYear`);
  }

  derouleuse3ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/derouleuse3ThisYear`);
  }

  derouleuse3LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/derouleuse3LastYear`);
  }

  bobineuse1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/bobineuse1ThisYear`);
  }

  bobineuse1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/bobineuse1LastYear`);
  }

  bobineuse2ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/bobineuse2ThisYear`);
  }

  bobineuse2LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/bobineuse2LastYear`);
  }

  bobineuse3ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/bobineuse3ThisYear`);
  }

  bobineuse3LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/bobineuse3LastYear`);
  }

  magbob1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/magbob1ThisYear`);
  }

  magbob1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/magbob1LastYear`);
  }

  magbob2ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/magbob2ThisYear`);
  }

  magbob2LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/magbob2LastYear`);
  }

  magbob3ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/magbob3ThisYear`);
  }

  magbob3LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/magbob3LastYear`);
  }

  massEZ1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massEZ1ThisYear`);
  }

  massEZ1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massEZ1LastYear`);
  }

  massENThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massENThisYear`);
  }

  massENLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massENLastYear`);
  }

  massEZ3ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massEZ3ThisYear`);
  }

  massEZ3LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massEZ3LastYear`);
  }

  massEZ4ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massEZ4ThisYear`);
  }

  massEZ4LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massEZ4LastYear`);
  }

  massAThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massAThisYear`);
  }

  massALastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massALastYear`);
  }

  massBThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massBThisYear`);
  }

  massBLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/massBLastYear`);
  }

  sechEZ1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ1ThisYear`);
  }

  sechEZ1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ1LastYear`);
  }

  sechEZ2ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ2ThisYear`);
  }

  sechEZ2LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ2LastYear`);
  }

  sechEZ3ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ3ThisYear`);
  }

  sechEZ3LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ3LastYear`);
  }

  sechEZ4ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ4ThisYear`);
  }

  sechEZ4LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechEZ4LastYear`);
  }

  sechER24ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechER24ThisYear`);
  }

  sechER24LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechER24LastYear`);
  }

  sechENThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechENThisYear`);
  }

  sechENLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/sechENLastYear`);
  }

  scieBongThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/scieBongThisYear`);
  }

  scieBongLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/scieBongLastYear`);
  }

  encolleuse1BrazilThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse1BrazilThisYear`);
  }

  encolleuse1BrazilLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse1BrazilLastYear`);
  }

  encolleuse2BrazilThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse2BrazilThisYear`);
  }

  encolleuse2BrazilLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse2BrazilLastYear`);
  }

  encolleuse3BrazilThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse3BrazilThisYear`);
  }

  encolleuse3BrazilLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse3BrazilLastYear`);
  }

  encolleuse1CPThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse1CPThisYear`);
  }

  encolleuse1CPLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse1CPLastYear`);
  }

  encolleuse2CPThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse2CPThisYear`);
  }

  encolleuse2CPLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse2CPLastYear`);
  }

  encolleuse3CPThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse3CPThisYear`);
  }

  encolleuse3CPLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/encolleuse3CPLastYear`);
  }

  presseTeteThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/presseTeteThisYear`);
  }

  presseTeteLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/presseTeteLastYear`);
  }

  trancheuse1ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/trancheuse1ThisYear`);
  }

  trancheuse1LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/trancheuse1LastYear`);
  }

  trancheuse2ThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/trancheuse2ThisYear`);
  }

  trancheuse2LastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/trancheuse2LastYear`);
  }

  presseSimiThisYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/presseSimiThisYear`);
  }

  presseSimiLastYear(): Observable<any>{
    return this.http.get(API_URLS.ALPICAM_URL + `/presseSimiLastYear`);
  }
}
