import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Arrets} from "../../../Models/arrets";
import {ArretsService} from "../../../services/arrets/arrets.service";
import {MachinesService} from "../../../services/machines/machines.service";
import {Machine} from "../../../Models/machines";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-arrets',
  templateUrl: './arrets.component.html',
  styleUrls: ['./arrets.component.css']
})
export class ArretsComponent implements OnInit {
  headings = 'Arrêts';
  subheadings = 'Gérez les arrêts machines ';
  icons = 'fa fa-clock fa-spin icon-gradient bg-mixed-hopes';

  arretForm: FormGroup;

  operation: string = 'add';

  arrets: Arrets[];
  ActiveArret: Arrets[];
  DesactiveArret: Arrets[];

  selectedArret: Arrets;
  newArret: Arrets;
  arr: Arrets;
  machines: Machine[];

  today: Date;

  constructor(private arretService: ArretsService,
              private fb: FormBuilder,
              private machineService: MachinesService,) {
    this.createForm();
    this.arr = new Arrets();
    var tim = new Date();
    this.today = tim;
  }

  createForm() {
    this.arretForm = this.fb.group({
      machine: ['', [Validators.required]],
      cause: ['', [Validators.required, Validators.minLength(5)]],
      date: ['', [Validators.required]],
      debut: ['', [Validators.required]],
      fin: [''],
      etat: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadMachines();
    this.LoadArrets();
    this.selectedArret = new Arrets();
    this.newArret = new Arrets();

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
          console.log('chargement des machines');
          console.log(this.machines);
          console.log('liste des lignes', this.machines);
        }
    );
  }

  LoadArrets(){

    this.arretService.getAllArrets().subscribe(
        data => {
          this.arrets = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('toutes les Arrets');
          console.log(this.arrets);
        }
    );
  }

  addArret() {
    const a = this.arretForm.value;
    console.log('formulaire 1 '+ a);

    var result           = '';
    var result1           = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var result2 = result;
    console.log('random nber '+ result2)

    this.arr.date = this.arretForm.controls['date'].value;
    this.arr.cause = this.arretForm.controls['cause'].value;
    this.arr.numero = result2;
    this.arr.etat = this.arretForm.controls['etat'].value;
    this.arr.debutArret = this.arretForm.controls['debut'].value;
    this.arr.finArret = this.arretForm.controls['fin'].value;
    this.arr.idMachine = this.arretForm.controls['machine'].value;

    // console.log('arret est: '+ this.arr.date);
    // console.log('arret est: '+ this.arr.cause);
    // console.log('arret est: '+ this.arr.numero);
    // console.log('arret est: '+ this.arr.etat);
    // console.log('arret est: '+ this.arr.debutArret);
    // console.log('arret est: '+ this.arr.finArret);
    // console.log('arret est: '+ this.arr.idMachine);
    // console.log('\n au final: '+ this.arr);
    // console.log('2 au final: \n'+ this.arretForm.value);

    //dès qu'on crée le département on affiche immédiatement la liste
    this.arretService.postArret(this.arr).subscribe(
        res => {
          this.initArret();
          this.LoadArrets();
          // this.loadActiveTechniciens();
          // this.loadDesactiveTechniciens();
        }
    );
  }

  updateArret() {
    this.arretService.putArret(this.selectedArret).subscribe(
        res => {
          this.initArret();
          this.LoadArrets();
        }
    );
  }

  initArret() {
    this.selectedArret = new Arrets();
    this.createForm();
  }

  swl(tec: Arrets){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Suppression',
      text: "Voulez-vous supprimer l\'arrêt N°" + this.newArret.numero+" ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#00ace6',
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.deleteArret();
        Swal.fire({
          title: 'Suppression',
          text: "Arrêt supprimée avec succès!",
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  deleteArret() {
    this.arretService.deleteArret(this.newArret.idArret).subscribe(
        res => {
          this.selectedArret = new Arrets();
          this.LoadArrets();
        }
    );
  }

}
