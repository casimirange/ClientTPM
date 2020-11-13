import { Component, OnInit } from '@angular/core';
// import {AuthService} from "../../services/auth/auth.service";
// import {Router} from "@angular/router";
// import {Principal} from "../../Models/principal";
// import {Store} from "@ngrx/store";
// import {PrincipalState} from "../../Models/principal.state";
// import {UserService} from "../../services/users/users.service";
// import {User} from "../../Models/users";
import {TokenStorageService} from "../../auth/token-storage.service";
import {MachinesService} from "../../services/machines/machines.service";
import {Machine} from "../../Models/machines";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // private principal: Principal;
  //
  // hasRole: boolean;
  // nom: string;
  // prenom: string;
  // selectedUser: User;
  info: any;
  machines: Machine[];
  private roles: string[];
  public authority: string;
  public name: string = '';
  constructor(private token: TokenStorageService,
              private machineService: MachinesService, private router: Router ) {
    // this.selectedUser = new User();
  }
  // constructor(private authService: AuthService, private router: Router, private store: Store<PrincipalState>,
  //             private userService: UserService) {
  //   // this.selectedUser = new User();
  // }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.loadMachines();

    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        // 'ROLE_USER_ALPI,,,,,,,'
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          this.name = 'Admin';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          this.name = 'Super Admin';
          return false;
        } else if (role === 'ROLE_USER_MINDOUROU') {
          this.authority = 'user_mind';
          this.name = 'user';
          return false;
        } else if (role === 'ROLE_RESP_PLACAGE') {
          this.authority = 'resp_pla';
          this.name = 'Responsable';
          return false;
        } else if (role === 'ROLE_RESP_SCIERIE') {
          this.authority = 'resp_sci';
          this.name = 'Responsable';
          return false;
        } else if (role === 'ROLE_RESP_BRAZIL') {
          this.authority = 'resp_sci';
          this.name = 'Responsable';
          return false;
        } else if (role === 'ROLE_RESP_CP') {
          this.authority = 'resp_cp';
          this.name = 'Responsable';
          return false;
        } else if (role === 'ROLE_RESP_MAINTENANCE') {
          this.authority = 'resp_maint';
          this.name = 'Responsable';
          return false;
        } else if (role === 'ROLE_RESP_MINDOUROU') {
          this.authority = 'resp_mind';
          this.name = 'Responsable';
          return false;
        }
        this.authority = 'user_alpi';
        this.name = 'user';
        return true;
      });
    }
    // this.store.select('principal').subscribe(principal => {
    //   console.log('prince');
    //   console.log(principal);
    //   this.principal = principal;
    //   this.nom = this.principal.name;
    // });
    // console.log('non');
    // console.log(this.nom);
    //
    // this.userService.findUser(this.nom).subscribe(
    //     res => {
    //       this.selectedUser = res;
    //       console.log('user');
    //       console.log(this.selectedUser);
    //     }
    // );

  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  loadMachines() {
    this.machineService.getMachines().subscribe(
        data => {

          this.machines = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des lignes');
          console.log(this.machines);
          console.log('liste des lignes', this.machines);
        }
    );
  }

  selectedEvent(m: Machine){
    let url = btoa(m.idMachine.toString());
    this.router.navigateByUrl("machines/"+url);
  }
}
