// /**
//  * Created by Casimir on 07/04/2020.
//  */
// import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
// import {Injectable} from "@angular/core";
// import { CookieService } from 'ngx-cookie-service';
//
//
// @Injectable()
// export class XhrInterceptor implements HttpInterceptor{
//
//     constructor(private cookieService: CookieService){}
//
//     intercept(req: HttpRequest<any>, next: HttpHandler){
//         const token  = this.cookieService.get('token');
//
//         const xhr = req.clone({
//             headers: req.headers.set('authorization', `Basic ${token}`)
//         });
//
//         return next.handle(xhr);
//     }
// }