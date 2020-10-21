import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
// import {PrincipalState} from "../../Models/principal.state";
// import {Principal} from "../../Models/principal";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private roles: string[];
  public authority: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        } else if (role === 'ROLE_RESPONSABLE') {
          this.authority = 'responsable';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
}
