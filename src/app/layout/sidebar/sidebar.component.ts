import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
// import {PrincipalState} from "../../Models/principal.state";
// import {Principal} from "../../Models/principal";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Departement} from "../../Models/departement";
import {DepartementsService} from "../../services/departements/departements.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private roles: string[];
  public authority: string;
  departement: Departement[];

  constructor(private tokenStorage: TokenStorageService,
              private departementService: DepartementsService,private router: Router ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        // 'ROLE_USER_ALPI,,,,,,,'
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_USER_MINDOUROU') {
          this.authority = 'user_mind';
          return false;
        } else if (role === 'ROLE_RESP_PLACAGE') {
          this.authority = 'resp_pla';
          return false;
        } else if (role === 'ROLE_RESP_SCIERIE') {
          this.authority = 'resp_sci';
          return false;
        } else if (role === 'ROLE_RESP_BRAZIL') {
          this.authority = 'resp_sci';
          return false;
        } else if (role === 'ROLE_RESP_CP') {
          this.authority = 'resp_cp';
          return false;
        } else if (role === 'ROLE_RESP_MAINTENANCE') {
          this.authority = 'resp_maint';
          return false;
        } else if (role === 'ROLE_RESP_MINDOUROU') {
          this.authority = 'resp_mind';
          return false;
        }
        this.authority = 'user_alpi';
        return true;
      });
    }

    this.loadDepartements()
  }

  showDepart(d: Departement){
    let url = btoa(d.idDepartement.toString());
    console.log(d.idDepartement +' '+url);
    this.router.navigateByUrl("departements/"+url);
  }

  loadDepartements() {
    this.departementService.getDepartements().subscribe(
        data => {
          this.departement = data
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des départements');
          console.log(this.departement)
        }
    );
  }
}
