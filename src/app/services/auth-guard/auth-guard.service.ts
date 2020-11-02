 import { Injectable } from '@angular/core';
 import {
    ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
    RouterStateSnapshot, UrlTree
 } from "@angular/router";
 import {Observable} from "rxjs";
 import {AuthService} from "../auth/auth.service";
 import {TokenStorageService} from "../auth/token storage/token-storage.service";

 @Injectable({
   providedIn: 'root'
 })
 export class AuthGuardService implements CanActivate{

     private roles: string[];
     private authority: string;

    constructor(private router: Router, private authService: AuthService, private token_storage: TokenStorageService) { }

    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      //   let token = localStorage.getItem('authToken')
      // //
      // if(token != null){
      //
      //     console.log('guard ', token);
      //   return true;
      //   this.router.navigate(['/dashboard']);
      // }

        if(this.token_storage.getToken()){
            return true;
        }

      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      console.log('tests')
      return false;

}

   // canActivateChild(
   //     route: ActivatedRouteSnapshot,
   //     state: RouterStateSnapshot
   // ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
   //     if (this.token_storage.getToken()) {
   //         this.roles = this.token_storage.getAuthorities();
   //         this.roles.every(role => {
   //             if (role === 'ROLE_ADMIN') {
   //                 return true;
   //             } else if (role === 'ROLE_SUPER_ADMIN') {
   //                 return true;
   //             } else if (role === 'ROLE_PM') {
   //                 return false;
   //             } else if (role === 'ROLE_RESPONSABLE') {
   //                 return true;
   //             }
   //             // this.authority = 'user';
   //             // return false;
   //         });
   //     }
   //
   //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
   //     return false;
   // }

}
