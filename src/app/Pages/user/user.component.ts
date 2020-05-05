import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../Models/users";
// import {SwalPortalTargets} from "@sweetalert2/ngx-sweetalert2";
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
// import  Swal from '@sweetalert2/ngx-sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import {Subscription, timer} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {RoleService} from "../../services/role/role.service";
import {Role} from "../../Models/roles";
import * as _ from 'lodash';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  headings = 'Droit d\'accès';
  subheadings = 'Gérez les accès l\'application en créant et attribuant les rôles aux utilisateurs';
  icons = 'fa fa-key icon-gradient bg-mixed-hopes';

  users: User[];
  roles: Role[];
  role: Role;
  operation: string = 'add';

  selectedUser: User;
  userModel: User;
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder,
              private authService: AuthService, private roleService: RoleService) {
    this.createForm();
    this.userModel = new User();
  }

  createForm() {
    this.userForm = this.fb.group({
      nom: ['', [ ]],
      prenom: ['', []],
      fonction: ['', []],
      matricule: ['', []],
      username: ['', []],
      role: ['', []],
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.initUser();
    this.loadRoles();
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //     if (result.value) {
    //       Swal.fire({
    //         title: 'supprimé',
    //         text: "You won't be able to revert this!",
    //         icon: 'success',
    //         timer: 3000
    //
    //       })
    //     }
    //   })
  }

  initUser() {
    this.selectedUser = new User();
    this.createForm();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
        data => {
          this.users = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des utilisateurs');
          console.log(this.users)
        }
    );
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
        datas => {
          this.roles = datas

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des roles');
          console.log(this.roles)
        }
    );
  }

  addUser() {

    var liste, texte;
    liste = document.getElementById("role");
    texte = liste.options[liste.selectedIndex].text;
    console.log("nom role:" + texte);
    let indexRole = _.findIndex(this.roles, (o => {
      return o.nom == texte;
    }));

    this.role = this.roles[indexRole];
    const t = this.userForm.value;
    // this.userModel.role = this.role;
    this.userModel.nom = this.userForm.controls['nom'].value;
    this.userModel.prenom = this.userForm.controls['prenom'].value;
    this.userModel.fonction = this.userForm.controls['fonction'].value;
    this.userModel.matricule = this.userForm.controls['matricule'].value;
    this.userModel.password = this.userForm.controls['matricule'].value;
    this.userModel.username = this.userForm.controls['username'].value;
    console.log('user 1');
    console.log(t);
    console.log('user 2');
    console.log(this.userModel);
    console.log('role');
    console.log(this.role);

    //dès qu'on crée le département on affiche immédiatement la liste
    if (this.role.nom === 'ROLE_USER') {
      this.userService.addUser(this.userModel).subscribe(
          res => {
            this.initUser();
            this.loadUsers();
          }
      );
    }else if (this.role.nom === 'ROLE_ADMIN') {
      this.userService.addAdmin(this.userModel).subscribe(
          res => {
            this.initUser();
            this.loadUsers();
          }
      );
    } else {
      this.userService.addSuperAdmin(this.userModel).subscribe(
          res => {
            this.initUser();
            this.loadUsers();
          }
      );
    }


  }

  updateUser(){

  }

  swl(){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'supprimé',
          text: "You won't be able to revert this!",
          icon: 'success',
          timer: 3000,
          showConfirmButton: false

        })
      }
    })
  }

}
