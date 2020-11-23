import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LignesService} from "../../services/lignes/lignes.service";
import {MachinesService} from "../../services/machines/machines.service";
import {Ligne} from "../../Models/lignes";
import {Machine} from "../../Models/machines";
import * as _ from 'lodash';
import {forEachComment} from "tslint";
import {variable} from "@angular/compiler/src/output/output_ast";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  
  headings = 'Machines';
  subheadings = 'Chaque machine appartient obligatoirement à une ligne';
  icons = 'fa fa-road icon-gradient bg-primary';

  machineModel: Machine;
  machines: Machine[];
  machineForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  pages: number = 7;

  operation: string = 'add';
  term: string;
  p: number;

  selectedMachine: Machine;

  ligns: Ligne[];
  ligns2: Ligne[];
  newligne: Ligne;
  private roles: string[];
  public authority: string;

  constructor(private fb: FormBuilder, private ligneService: LignesService,
              private router: Router,
              private tokenStorage: TokenStorageService,private _location: Location,
              private machineService: MachinesService)
      {
        this.createForm();
        this.createForm1();
        this.createForms();
        this.pageForms();
        this.machineModel = new Machine();
        this.newligne= new Ligne();
      }

  createForm() {
    this.machineForm = this.fb.group({
      nom: ['', [Validators.required]],
      cc: ['', [Validators.required]],
      code: ['', [Validators.required]],
      label: ['', [Validators.required]],
      depL: ['']
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
    this.loadMachines();
    this.loadligns();
    this.initMachine();
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

  loadActiveMachine() {
    this.machineService.getActiveMachines().subscribe(
        data => {
          this.machines = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
        }
    );
  }

  loadDesactiveMachine() {
    this.machineService.getDesactiveMachines().subscribe(
        data => {
          this.machines = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
        }
    );
  }

  activeMachine(){
    this.machineService.activeMachine(this.selectedMachine.code).subscribe(
        res => {
          this.initMachine();
          // this.loadActiveTechniciens();
          // this.loadDesactiveTechniciens();
          this.loadMachines();
        }
    );
  }

  loadligns() {
    this.ligneService.getLignes().subscribe(
        data => {
          this.ligns = data
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des départements');
          console.log(this.ligns)
        }
    );
  }

  addMachine() {
    var liste, texte;
    liste = document.getElementById("liste");
    texte = liste.options[liste.selectedIndex].text;
    console.log("model_ligne:" + texte);
    let indexDep = _.findIndex(this.ligns, (o => {
      return o.nomLigne == texte;
    }));

    this.newligne = this.ligns[indexDep];
    // this.machineModel.idLigne = this.newligne.idLigne;
    this.machineModel.idLigne = this.machineForm.controls['depL'].value;
    this.machineModel.nom = this.machineForm.controls['nom'].value;
    this.machineModel.code = this.machineForm.controls['code'].value;
    this.machineModel.centreCout = this.machineForm.controls['cc'].value;
    this.machineModel.label = this.machineForm.controls['label'].value;
    console.log("index", indexDep);
    console.log("model", this.machineModel);

    console.log("ligne :" + this.machineModel.idLigne);
    console.log("nom :" + this.machineForm.controls['nom'].value);
    console.log("code :" + this.machineForm.controls['code'].value);
    console.log("cc :" + this.machineForm.controls['cc'].value);
    console.log("label :" + this.machineForm.controls['label'].value);



    //dès qu'on crée la ligne on affiche immédiatement la liste
    this.machineService.addMachine(this.machineModel).subscribe(
        res => {
          this.initMachine();
          this.loadMachines();
        }
    );
  }

  updateMachine() {
    var liste, texte;
    liste = document.getElementById("liste");
    texte = liste.options[liste.selectedIndex].text;
    console.log("model_ligne:" + texte);
    let indexDep = _.findIndex(this.ligns, (o => {
      return o.nomLigne == texte;
    }));
    console.log("centre cout: "+this.machineForm.controls['cc'].value);

    this.newligne = this.ligns[indexDep];
    // this.machineModel.idLigne = this.newligne.idLigne;
    this.machineModel.idLigne = this.machineForm.controls['depL'].value;
    this.machineModel.nom = this.machineForm.controls['nom'].value;
    this.machineModel.code = this.machineForm.controls['code'].value;
    this.machineModel.centreCout = this.machineForm.controls['cc'].value;
    this.machineModel.label = this.machineForm.controls['label'].value;
    this.machineModel.etat = this.selectedMachine.etat;
    console.log("machine"+ this.selectedMachine);
    this.machineService.updateMachine(this.machineModel).subscribe(
        res => {
          this.initMachine();
          this.loadMachines();
        }
    );
  }

  initMachine() {
    this.selectedMachine = new Machine();
    this.createForm();
  }

  deleteMachine() {
    this.machineService.deleteMachine(this.selectedMachine.idMachine).subscribe(
        res => {
          this.selectedMachine = new Machine();
          this.loadMachines();
        }
    );
  }

  showMachine(m: Machine){
    let url = btoa(m.idMachine.toString());
    this.router.navigateByUrl("machines/"+url);
  }

  swl(tec: Machine){
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
        this.activeMachine();
        Swal.fire({
          // title: tec.etat == false ? 'Activation' : 'Désactivation',
          html:  tec.etat == false ? 'Machine ' + tec.nom.toUpperCase().bold() +' Activée avec succès!' : 'Machine ' + tec.nom.toUpperCase().bold() +' Désactivée avec succès!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  findSso($event){
    if (this.selectPanForm.controls['periode'].value == 'tous'){
      this.loadMachines();
    }
    if (this.selectPanForm.controls['periode'].value == 'actifs'){
      this.loadActiveMachine();
    }
    if (this.selectPanForm.controls['periode'].value == 'inactifs'){
      this.loadDesactiveMachine();
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
