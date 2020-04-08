import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'ClientTPM';

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(){
    if (!this.authService.authenticated){
      this.router.navigateByUrl('/login');
    }else {
      this.router.navigateByUrl('/lignes');
    }
  }
}
