import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Principal} from "../../Models/principal";
import {Store} from "@ngrx/store";
import {PrincipalState} from "../../Models/principal.state";
import {UserService} from "../../services/user/user.service";
import {User} from "../../Models/users";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private principal: Principal;

  hasRole: boolean;
  nom: string;
  prenom: string;
  selectedUser: User;
  constructor(private authService: AuthService, private router: Router, private store: Store<PrincipalState>,
              private userService: UserService) {
    this.selectedUser = new User();
  }

  ngOnInit() {
    this.store.select('principal').subscribe(principal => {
      console.log('prince');
      console.log(principal);
      this.principal = principal;
      this.nom = this.principal.name;
    });
    console.log('non');
    console.log(this.nom);

    this.userService.findUser(this.nom).subscribe(
        res => {
          this.selectedUser = res;
          console.log('user');
          console.log(this.selectedUser);
        }
    );

  }

  logout(){
    this.authService.logout(()=>{
      this.router.navigateByUrl('/login');
    })
  }
}
