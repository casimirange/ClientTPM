import { Component, OnInit } from '@angular/core';
import {Pannes} from "../../../../Models/pannes";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Machine} from "../../../../Models/machines";
import {Operateur} from "../../../../Models/operateurs";
import {Technicien} from "../../../../Models/techniciens";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PannesService} from "../../../../services/pannes/pannes.service";
import {TechniciensService} from "../../../../services/techniciens/techniciens.service";
import {OperateursService} from "../../../../services/operateurs/operateurs.service";
import {MachinesService} from "../../../../services/machines/machines.service";
import DateTimeFormat = Intl.DateTimeFormat;
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-single-panne',
  templateUrl: './single-panne.component.html',
  styleUrls: ['./single-panne.component.css']
})
export class SinglePanneComponent implements OnInit {

  headings = 'Panne N° ';
  subheadings = 'Déclarez les pannes survenues au cours de la journée';
  icons = 'fa fa-wrench icon-gradient bg-heavy-rain';

  suitePanForm: FormGroup;
  operateurs: Operateur[];
  selop: Operateur;
  techniciens: Technicien[];
  panne: Pannes;
  pn: Pannes;
  continuePanne: Pannes;
  unPan: Pannes[];
  closeResult: any;
  Tpannes: Pannes[];

  term: string;
  p: number;
  f: Date;
  d: Date;
  ha: DateTimeFormat;
  fi: DateTimeFormat;
  di: DateTimeFormat;
  piece: string;
  private roles: string[];
  public authority: string;

  constructor(private opService: OperateursService,
              private techService: TechniciensService,
              private fb: FormBuilder,
              private panneService: PannesService,
              private modalService: NgbModal,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private router: Router, private _location: Location) {
    this.createForm();
    this.panne = new Pannes();
    this.pn = new Pannes();
    this.continuePanne = new Pannes();
    this.selop = new Operateur();


  }

  createForm() {
    this.suitePanForm = this.fb.group({
      dateP: [''],
      idMachine: ['', [Validators.required]],
      heureArret: ['', [Validators.required]],
      debutInter: ['', [Validators.required]],
      finInter: ['', [Validators.required]],
      idOperateur: ['', [Validators.required]],
      numero: [''],
      idTechnicien: this.fb.array([]),
      description: [''],
      cause: ['', [Validators.required, Validators.minLength(5)]],
      details: ['', [Validators.required, Validators.minLength(5)]],
      outil: [''],
      qte: [''],
      ref: [''],
      pic: [''],
    });


  }

  ngOnInit() {
    this.loadOperateurs();
    this.loadActiveTechniciens();
    this.loadUnfinishedPannes();
    this.loadTechPannes(this.panne);
    this.showPanne();

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
          // const Swal = require('sweetalert2');
          // var content = document.createElement('div');
          // content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          // Swal.fire({
          //     title: 'Aucun Accès!',
          //     html: content,
          //     icon: 'error',
          //     showCancelButton: false,
          //     confirmButtonText: 'OK',
          //     allowOutsideClick: false,
          //     focusConfirm: true,
          // }).then((result) => {
          //     this._location.back();
          // })
          return false;
        } else if (role === 'ROLE_RESP_PLACAGE') {
          this.authority = 'resp_pla';
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
          const Swal = require('sweetalert2');
          var content = document.createElement('div');
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
        return true;
      });
    }
  }

  endPanne() {
    const Swal = require('sweetalert2');
    this.panne.idT = this.suitePanForm.controls['idTechnicien'].value ? this.suitePanForm.controls['idTechnicien'].value : [];

    //ici je parcours la liste des utilisateurs ajoutés puis j'insère
    if(!this.panne.idT.length){
      Swal.fire({
        title: 'Attention!!',
        text: "Vous n'avez sélectionné aucun technicien ",
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: '#b97a56',
        cancelButtonText: 'OK',
        allowOutsideClick: false
      });
    }else {

      for (let x = 0; x < this.panne.idT.length; x++) {
        console.log('nbre enrg ' + x);
        console.log(this.panne.idT[x]);
        console.log('hum ' + this.suitePanForm.controls['idTechnicien'].value[x]);
        this.pn.date = this.suitePanForm.controls['dateP'].value;
        this.pn.idMachine = this.suitePanForm.controls['idMachine'].value;
        this.pn.heureArret = this.suitePanForm.controls['heureArret'].value.toString();
        this.pn.debutInter = this.suitePanForm.controls['debutInter'].value.toString();
        this.pn.finInter = this.suitePanForm.controls['finInter'].value.toString();
        this.pn.idOperateur = this.suitePanForm.controls['idOperateur'].value;
        this.pn.idTechnicien = this.suitePanForm.controls['idTechnicien'].value[x];
        this.pn.description = this.suitePanForm.controls['description'].value;
        this.pn.cause = this.suitePanForm.controls['cause'].value;
        this.pn.details = this.suitePanForm.controls['details'].value;
        this.pn.outil = this.suitePanForm.controls['outil'].value;
        this.pn.qte = this.suitePanForm.controls['qte'].value;
        this.pn.ref = this.suitePanForm.controls['ref'].value;
        this.pn.etat = true;
        this.pn.numero = this.suitePanForm.controls['numero'].value;
        this.pn.cont = false;
        this.pn.quart = 2;

        this.panneService.activePanne(this.pn.numero).subscribe(
            res => {
              console.log('panne terminée')
            }
        );
        //
        console.log("panne end");
        console.log(this.pn);

        this.panneService.addPannes(this.pn).subscribe(
            res => {

              this.router.navigateByUrl('/pannes')

            },
            error2 => {

            },
            () =>{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                onOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
              });

              Toast.fire({
                icon: 'success',
                title: 'Panne Achevée'
              });
            }
        );
      }
    }



  }

  initPanne(){
    this.panne = new Pannes();
    this.pn = new Pannes();
    // this.createForm();
  }

  loadOperateurs() {
    this.opService.getActiveOperateurs().subscribe(
        data => {
          this.operateurs = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens');
          console.log(this.operateurs)
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
          console.log(this.techniciens)
        }
    );
  }

  loadUnfinishedPannes() {
    this.panneService.getUnfinishedPannes().subscribe(
        data => {
          this.unPan = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
          console.log(this.unPan)
        }
    );
  }

  getTechni() {
    return this.suitePanForm.get('idTechnicien') as FormArray;
  }

  onAddTech() {
    const newControl = this.fb.control('', Validators.required);
    this.getTechni().push(newControl);
  }

  onMoveTech(i: number) {
    const newControl = this.fb.control('', Validators.required);
    this.getTechni().removeAt(i);
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
  }

  loadTechPannes(pan: Pannes){

    this.panneService.getTechPannes(pan.numero).subscribe(
        data => {
          this.Tpannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Techniques');
          console.log(this.Tpannes);
        }
    );
  }


  showPanne() {
    this.route.params.subscribe(params => {
      this.panneService.showPannes(params['numero']).subscribe(
          res => {
            this.continuePanne = res;
            // headings = this.continuePanne.machine;
            console.log("Panne");
            console.log(this.continuePanne);
            console.log("Panne Num");
            console.log(this.continuePanne.numero);
          }
      )
    })
  }

  resetState(){

  }
}
