import { Component, OnInit } from '@angular/core';

// import { UserService } from '../services/users.service';
import {UserService} from "../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../Models/users";
import {TokenStorageService} from "../auth/token-storage.service";
import {Location} from '@angular/common';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../auth/auth.service";
import { SignUpInfo } from '../auth/signup-info';

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

  searchPanForm: FormGroup;
  users: any[];
  SelectedUser: User;
  roles: string[] = [];
  private authority: string;
  closeResult: any;
  registerForm: FormGroup;


  role: string[] = [];

  respCP: string;
  respPL: string;
  respMIND: string;
  respMAINT: string;
  admin: string;
  userMIND: string;
  userAL: string;
  signupInfos: SignUpInfo;
  constructor(private modalService: NgbModal, private userService: UserService, private fb: FormBuilder, private tokenStorage: TokenStorageService,private _location: Location, private authService: AuthService) {
    this.createForm1();
    this.SelectedUser = new User;
  }

  createForm1() {
    this.searchPanForm = this.fb.group({
      search: [''],
    });
  }

  ngOnInit() {

    this.registerForm = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required ]],
      password: ['', [Validators.minLength(6), Validators.required ]],
      name: ['', [Validators.minLength(4), Validators.required ]],
      email: ['', [Validators.minLength(6), Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$") ]],
      respCP: ['',],
      respPL: ['',],
      respMIND: ['',],
      respMAINT: ['',],
      admin: ['',],
      userMIND: ['',],
      userAL: ['',],
    });

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

        if(this.authority != 'super_admin') {
         const Swal = require('sweetalert2');
         var content = document.createElement('div');
         content.innerHTML = 'Vous n\'avez pas les authorisations requises pour accéder à cette page' ;
         Swal.fire({
           title: 'Non Authorisé',
           html: content,
           icon: 'warning',
           footer: '<a >Rapprochez vous au près de votre administrateur</a>',

           showCancelButton: false,
           showClass: {
             popup: 'animate__animated animate__fadeInDown'
           },
           hideClass: {
             popup: 'animate__animated animate__fadeOutUp'
           },
           confirmButtonColor: '#b97a56',
           confirmButtonText: 'OK',
           allowOutsideClick: false,
           focusConfirm: false,
           showLoaderOnConfirm: true
         }).then((result) => {
           if (result.value) {
             this._location.back();
           }
         })
       }

    }

    this.userService.getUserBoard().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );

    this.LoadUsers();
  }

  LoadUsers(){
    this.userService.getUsers().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log('erreure', error);
        },
        () =>{
          console.log('users ', this.users)
        }
    )
  }

  modal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
  }

  swl(pan: User){
    const Swal = require('sweetalert2');
    var content = document.createElement('div');
    content.innerHTML = 'Voulez-vous vraiment supprimer <strong>' + pan.username.toString()+ '</strong> de la plateforme ?';
    Swal.fire({
      title: 'Suppression',
      html: content,
      icon: 'error',
      footer: '<a >Cette action est irréversible</a>',

      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusCancel: true,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.authService.deleteUser(pan.id).subscribe(
            res => {
              console.log('panne supprimée')
              this.modalService.dismissAll();
              this.LoadUsers();
            }
        );
        Swal.fire({
          title: 'Suppression !',
          text: "Utilisateur supprimé avec succès!",
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });


      }
    })
  }

  onUpdate(user: User) {
    this.role = [];

    console.log('admin', this.registerForm.controls['admin'].value );
    this.respCP =  'responsable'
    this.respPL =  'responsable'
    this.respMIND =  'responsable'
    this.respMAINT =  'pm'
    this.admin =  'admin'
    this.userMIND =  'user'
    this.userAL =  'user'

    this.registerForm.controls['admin'].value != '' ? this.role.push(this.admin) : '';
    this.registerForm.controls['respCP'].value != '' ? this.role.push(this.respCP): '';
    this.registerForm.controls['respPL'].value != '' ? this.role.push(this.respPL): '';
    this.registerForm.controls['respMAINT'].value != '' ? this.role.push(this.respMAINT): '';
    this.registerForm.controls['respMIND'].value != '' ? this.role.push(this.respMIND): '';
    this.registerForm.controls['userMIND'].value != '' ? this.role.push(this.userMIND): '';
    this.registerForm.controls['userAL'].value != '' ? this.role.push(this.userAL): '';

    this.signupInfos = new SignUpInfo(
        this.registerForm.controls['name'].value,
        this.registerForm.controls['username'].value,
        this.registerForm.controls['email'].value,
        this.registerForm.controls['password'].value,
        this.role
    );

    console.log('utilisateur', this.signupInfos)

    this.authService.updateUser(this.signupInfos, user.id).subscribe(
        data => {
          console.log(data);
          this.LoadUsers();
          const Swal = require('sweetalert2');
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });

          Toast.fire({
            icon: 'success',
            title: 'Ajout avec succès',
            text: data
          })
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          const Swal = require('sweetalert2');
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            background: '#f7d3dc',
            timer: 10000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });

          Toast.fire({
            icon: 'error',
            text: error.error.message,
            title: "Echec d\'enregistrement"
          })
        }
    );
  }
}
