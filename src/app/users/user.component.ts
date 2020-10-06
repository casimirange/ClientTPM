import { Component, OnInit } from '@angular/core';
// import { UserService } from '../services/users.service';
import {UserService} from "../services/user/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;

  headings = 'Users';
  subheadings = 'Gestion des droits d\'accès';
  icons = 'lnr-user icon-gradient bg-mixed-hopes';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
