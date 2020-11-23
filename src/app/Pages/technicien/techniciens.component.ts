import { Component, OnInit } from '@angular/core';
import {TechniciensService} from "../../services/techniciens/techniciens.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Technicien} from "../../Models/techniciens";
// import  Swal from 'sweetalert2';
// import  Swal from '@sweetalert2/ngx-sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import {Location} from "@angular/common";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-techniciens',
  templateUrl: './techniciens.component.html',
  styleUrls: ['./techniciens.component.css']
})
export class TechniciensComponent implements OnInit {

  headings = 'Techniciens';
  subheadings = 'Gérez les techniciens dans l\'application';
  icons = 'lnr-user icon-gradient bg-mixed-hopes';

  techForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;

  operation: string = 'add';
  pages: number = 7;

  techniciens: Technicien[];
    term: string;
    p: number;

  selectedTech: Technicien;
    private modelTech: Technicien;


    private roles: string[];
    public authority: string;

  constructor(private techService: TechniciensService, private fb: FormBuilder,
              private router: Router,
              private tokenStorage: TokenStorageService,private _location: Location) {
    this.createForm();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.modelTech = new Technicien;
  }

  createForm() {
    this.techForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      matricule: ['', [Validators.required]]
    });
  }

    createForm1() {
        this.searchPanForm = this.fb.group({
            search: [''],
        });
    }

    createForms() {
        this.selectPanForm = this.fb.group({
            periode: ['']
        });
    }

    pageForms() {
        this.pageForm = this.fb.group({
            page: ['']
        });
    }

  ngOnInit() {
    this.loadTechniciens();
    this.initTech();
      if (this.tokenStorage.getToken()) {
          this.roles = this.tokenStorage.getAuthorities();
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
          this.roles.every(role => {
              if (role === 'ROLE_ADMIN') {
                  this.authority = 'admin';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_SUPER_ADMIN') {
                  this.authority = 'super_admin';
                  return false;
              } else if (role === 'ROLE_USER_MINDOUROU') {
                  this.authority = 'user_mind';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_RESP_PLACAGE') {
                  this.authority = 'resp_pla';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_RESP_SCIERIE') {
                  this.authority = 'resp_sci';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_RESP_BRAZIL') {
                  this.authority = 'resp_bra';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_RESP_CP') {
                  this.authority = 'resp_cp';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_RESP_MAINTENANCE') {
                  this.authority = 'resp_maint';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;
              } else if (role === 'ROLE_RESP_MINDOUROU') {
                  this.authority = 'resp_mind';
                  content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                  Swal.fire({
                      title: 'Aucun Accès!',
                      html: content,
                      icon: 'error',
                      showCancelButton: false,
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                      focusConfirm: true,
                  }).then((result) => {
                      this._location.back();
                  })
                  return false;

              }
              this.authority = 'user_alpi';
              content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
              Swal.fire({
                  title: 'Aucun Accès!',
                  html: content,
                  icon: 'error',
                  showCancelButton: false,
                  confirmButtonText: 'OK',
                  allowOutsideClick: false,
                  focusConfirm: true,
              }).then((result) => {
                  this._location.back();
              })
              return true;
          });
      }
  }

  loadTechniciens() {
    this.techService.getTechniciens().subscribe(
        data => {
          this.techniciens = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens');
          console.log(this.techniciens)
        }
    );
  }

    loadActiveTechniciens() {
        this.techService.getActiveTechniciens().subscribe(
            data => {
                this.techniciens = data

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens actifs');
            }
        );
    }

    loadDesactiveTechniciens() {
        this.techService.getDesactiveTechniciens().subscribe(
            data => {
                this.techniciens = data

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens actifs');
            }
        );
    }

  addTechnicien() {
    const t = this.techForm.value;
    console.log(t);
    this.selectedTech = t;
    this.selectedTech.localisation = 'bonaberi';

    //dès qu'on crée le département on affiche immédiatement la liste
    this.techService.addTech(this.selectedTech).subscribe(
        res => {
          this.initTech();
          this.loadTechniciens();
        }
    );

  }

  updateTechnicien() {
      // console.log('tech: '+ this.selectedTech)
      this.modelTech.nom = this.techForm.controls['nom'].value;
      this.modelTech.prenom = this.techForm.controls['prenom'].value;
      this.modelTech.fonction= this.techForm.controls['fonction'].value;
      this.modelTech.matricule= this.techForm.controls['matricule'].value;
      this.modelTech.etat = this.selectedTech.etat;
      this.modelTech.idTechnicien = this.selectedTech.idTechnicien;

      console.log('nom : '+ this.modelTech.nom )
      console.log('prenom : '+ this.modelTech.prenom )
      console.log('fonction: '+ this.modelTech.fonction)
      console.log('matricule: '+ this.modelTech.matricule)
      console.log('etat : '+ this.modelTech.etat )
      console.log('idTechnicien : '+ this.modelTech.idTechnicien )
    this.techService.updateTech(this.modelTech).subscribe(
        res => {
          this.initTech();
            this.loadTechniciens();
        }
    );
  }

  initTech() {
    this.selectedTech = new Technicien();
    this.createForm();
  }

  deleteTechnicien() {
    this.techService.deleteTech(this.selectedTech.idTechnicien).subscribe(
        res => {
          this.selectedTech = new Technicien();
            this.loadTechniciens();
            this.loadActiveTechniciens();
            this.loadDesactiveTechniciens();
        }
    );
  }

  activeTechnicien(){
      this.techService.activeTech(this.selectedTech.matricule).subscribe(
          res => {
              this.initTech();
              // this.loadActiveTechniciens();
              // this.loadDesactiveTechniciens();
              this.loadTechniciens();
          }
      );
  }

    swl(tec: Technicien){
      const Swal = require('sweetalert2');
        Swal.fire({
            title: tec.etat == false ? 'Activation' : 'Désactivation',
            html: tec.etat == false ? "Voulez-vous activer "+ tec.nom.toUpperCase().bold(): "Voulez-vous désactiver " + tec.nom.toUpperCase().bold()+" ?",
            icon: tec.etat == false ? 'question' : 'warning',
            showCancelButton: true,

            confirmButtonColor: '#00ace6',
            cancelButtonColor: '#f65656',
            confirmButtonText: 'OUI',
            cancelButtonText: 'Annuler',
            allowOutsideClick: true,
            focusConfirm: false,
            focusCancel: false,
            focusDeny: true,
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                this.activeTechnicien();
                Swal.fire({
                    // title: tec.etat == false ? 'Activation' : 'Désactivation',
                    html:  tec.etat == false ? 'Utilisateur ' + tec.nom.toUpperCase().bold() +' Activé avec succès!' : 'Utilisateur ' + tec.nom.toUpperCase().bold() +' Désactivé avec succès!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        })
    }

    findSso($event){
        if (this.selectPanForm.controls['periode'].value == 'tous'){
            this.loadTechniciens();
        }
        if (this.selectPanForm.controls['periode'].value == 'actifs'){
            this.loadActiveTechniciens();
        }
        if (this.selectPanForm.controls['periode'].value == 'inactifs'){
            this.loadDesactiveTechniciens();
        }
    }

    paginate($event){
        if (this.pageForm.controls['page'].value == '10'){
            this.pages = 10;
        }
        if (this.pageForm.controls['page'].value == '25'){
            this.pages = 25;
        }
        if (this.pageForm.controls['page'].value == '50'){
            this.pages = 50;
        }
        if (this.pageForm.controls['page'].value == '100'){
            this.pages = 100;
        }
        if (this.pageForm.controls['page'].value == '1000'){
            this.pages = 1000;
        }
    }

}
