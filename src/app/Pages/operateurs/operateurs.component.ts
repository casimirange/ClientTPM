import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Operateur} from "../../Models/operateurs";
import {OperateursService} from "../../services/operateurs/operateurs.service";

@Component({
  selector: 'app-operateurs',
  templateUrl: './operateurs.component.html',
  styleUrls: ['./operateurs.component.css']
})
export class OperateursComponent implements OnInit {

  headings = 'Operateurs';
  subheadings = 'Gérez les opérateurs dans l\'application';
  icons = 'fa fa-user icon-gradient bg-mixed-hopes';

  opForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  operation: string = 'add';
  pages: number = 7;

  operateurs: Operateur[];

  selectedOp: Operateur;
  modelOp: Operateur;

  constructor(private opService: OperateursService, private fb: FormBuilder) {
    this.createForm();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.modelOp = new Operateur;
  }

  createForm() {
    this.opForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      matricule: ['', [Validators.required, Validators.minLength(3)]]
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
    this.loadOperateurs();
    this.initOp();
  }

  loadOperateurs() {
    this.opService.getOperateurs().subscribe(
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

  addOperateur() {
    const o = this.opForm.value;
    console.log(o);
    this.selectedOp = o;
    this.selectedOp.localisation = 'bonaberi';

    //dès qu'on crée le département on affiche immédiatement la liste
    this.opService.addOp(this.selectedOp).subscribe(
        res => {
          this.initOp();
          this.loadOperateurs();
        }
    );
  }

  updateOperateur() {
    this.modelOp.nomOP = this.opForm.controls['nom'].value;
    this.modelOp.prenomOP = this.opForm.controls['prenom'].value;
    this.modelOp.matOP = this.opForm.controls['matricule'].value;
    this.modelOp.etat = this.selectedOp.etat;
    this.modelOp.idOP = this.selectedOp.idOP;
    this.opService.updateOp(this.modelOp).subscribe(
        res => {
          this.initOp();
          this.loadOperateurs();
        }
    );
  }

  initOp() {
    this.selectedOp= new Operateur();
    this.createForm();
  }

  deleteOperateur() {
    this.opService.deleteOp(this.selectedOp.matOP).subscribe(
        res => {
          this.selectedOp= new Operateur();
          this.loadOperateurs();
        }
    );
  }

  loadActiveOperateur() {
    this.opService.getActiveOperateurs().subscribe(
        data => {
          this.operateurs = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
        }
    );
  }

  loadDesactiveOperateur() {
    this.opService.getDesactiveOperateurs().subscribe(
        data => {
          this.operateurs = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
        }
    );
  }

  activeOperateur(){
    this.opService.activeOp(this.selectedOp.matOP).subscribe(
        res => {
          this.initOp();
          // this.loadActiveTechniciens();
          // this.loadDesactiveTechniciens();
          this.loadOperateurs();
        }
    );
  }

  swl(tec: Operateur){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: tec.etat == false ? 'Activation' : 'Désactivation',
      html: tec.etat == false ? "Voulez-vous activer "+ tec.nomOP.toUpperCase().bold(): "Voulez-vous désactiver " + tec.nomOP.toUpperCase().bold()+" ?",
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
        this.activeOperateur();
        Swal.fire({
          // title: tec.etat == false ? 'Activation' : 'Désactivation',
          html:  tec.etat == false ? 'Opérateur ' + tec.nomOP.toUpperCase().bold() +' Activé avec succès!' : 'Opérateur ' + tec.nomOP.toUpperCase().bold() +' Désactivé avec succès!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  findSso($event){
    if (this.selectPanForm.controls['periode'].value == 'tous'){
      this.loadOperateurs();
    }
    if (this.selectPanForm.controls['periode'].value == 'actifs'){
      this.loadActiveOperateur();
    }
    if (this.selectPanForm.controls['periode'].value == 'inactifs'){
      this.loadDesactiveOperateur();
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
