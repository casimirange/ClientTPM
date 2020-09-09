import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Arrets} from "../../../Models/arrets";
import {ArretsService} from "../../../services/arrets/arrets.service";
import {MachinesService} from "../../../services/machines/machines.service";
import {Machine} from "../../../Models/machines";
import DateTimeFormat = Intl.DateTimeFormat;
import {Color} from "ng2-charts";

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
  rangeForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;

  operation: string = 'add';

  arrets: Arrets[];
  ActiveArret: Arrets[];
  DesactiveArret: Arrets[];

  selectedArret: Arrets;
  newArret: Arrets;
  arr: Arrets;
  machines: Machine[];
  pages: number = 7;
  today: Date;
  typeArret = {
    labels: [],
    nbre: [],
    tdt: []
  };

    public lineChartColors: Color[] = [
        { // red
            backgroundColor: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#dad9dd'],
            borderColor: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#dad9dd'],
        },

    ];

  constructor(private arretService: ArretsService,
              private fb: FormBuilder,
              private machineService: MachinesService,) {
    this.createForm();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.rangeForms();
    this.arr = new Arrets();
    // this.selectedArret = new Arrets();
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
      pic1: [''],
      // numero: [''],
    });
  }

  ngOnInit() {
    this.loadMachines();
    this.LoadArrets();
    this.initArret();
    this.typeArretThisMonth();
    this.newArret = new Arrets();

  }
  rangeForms() {
    this.rangeForm = this.fb.group({
      date1: [''],
      date2: ['']
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

    typeArretThisMonth(){
        this.typeArret.labels = [];
        this.typeArret.nbre = [];
        this.typeArret.tdt = [];
        this.arretService.getArretTypeThisMonth().subscribe(
            list => list.forEach(mach => {
                this.typeArret.labels.push(mach.type.toUpperCase());
                this.typeArret.nbre.push(mach.nbre);
                this.typeArret.tdt.push(mach.TDT);
            })
        );

    }

  addArret() {
    const a = this.arretForm.value;
    console.log('formulaire 1 '+ a);

    var result           = '';
    var result1          = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    var result2 = result;
    console.log('random nber '+ result2)

    this.newArret.date = this.arretForm.controls['date'].value;
    this.newArret.cause = this.arretForm.controls['pic1'].value != 'divers' ? this.arretForm.controls['pic1'].value : this.arretForm.controls['cause'].value;
    this.newArret.numero = result2;
    // this.arr.etat = this.arretForm.controls['etat'].value;
    this.newArret.debutArret = this.arretForm.controls['debut'].value;
    this.newArret.finArret = this.arretForm.controls['fin'].value;
    this.newArret.idMachine = this.arretForm.controls['machine'].value;
    console.log('\n au final: '+ this.newArret);
    // console.log('2 au final: \n'+ this.arretForm.value);

    //dès qu'on crée le département on affiche immédiatement la liste
    this.arretService.postArret(this.newArret).subscribe(
        res => {
          this.initArret();
          this.LoadArrets();
          // this.loadActiveTechniciens();
          // this.loadDesactiveTechniciens();
        }
    );
  }

  updateArret() {
      const a = this.arretForm.value;
      this.arr.date = this.selectedArret.date;
      this.arr.cause = this.selectedArret.cause;
      this.arr.numero = this.selectedArret.numero;
      this.arr.debutArret = this.selectedArret.debutArret;
      this.arr.finArret = this.selectedArret.finArret;
      this.arr.idMachine = this.selectedArret.idMachine;
      this.arr.idArret = this.selectedArret.idArret;
      console.log('modif Arrêt :' + a);
      console.log('modif Arrêt2 :' + this.selectedArret.idMachine);
      console.log('modif Arrêt3 :' + this.arr.idArret);
    this.arretService.putArret(this.arr).subscribe(
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

    this.arretService.deleteArret(this.selectedArret.idArret).subscribe(
        res => {
          this.initArret()
          this.LoadArrets();
        }
    );
  }

    // findSso($event){
    //     if (this.selectPanForm.controls['periode'].value == 'hp'){
    //         this.HierPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'ttesp'){
    //         this.loadPannes();
    //         this.countAllPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'tp'){
    //         this.TodayPannes();
    //         this.countTodayPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'twp'){
    //         this.ThisWeekPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'lwp'){
    //         this.LastWeekPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'tmp'){
    //         this.ThisMonthPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'lmp'){
    //         this.LastMonthPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'typ'){
    //         this.ThisYearPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'lyp'){
    //         this.LastYearPannes();
    //     }
    //     if (this.selectPanForm.controls['periode'].value == 'pp'){
    //         this.ranger = "true";
    //     }
    //     else {
    //         this.ranger = "false";
    //     }
    // }

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
