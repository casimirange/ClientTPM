import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PannesService} from "../../../services/pannes/pannes.service";
import {Pannes} from "../../../Models/pannes";
import {AgGridAngular} from "ag-grid-angular"
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import jsPDF from 'jspdf';
import {Router} from "@angular/router";

import  * as html2canvas from "html2canvas";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {Location} from "@angular/common";
// import {content} from "html2canvas/dist/types/src/css";
// import {content} from "html2canvas/dist/types/css";

@Component({
  selector: 'app-pannes',
  templateUrl: './pannes.component.html',
  styleUrls: ['./pannes.component.css']
})
export class PannesComponent implements OnInit {
  headings = 'Pannes';
  subheadings = 'Consultez la liste des pannes survenues';
  icons = 'pe-7s-tools icon-gradient bg-heavy-rain';

  loader: boolean = false;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  rangeForm: FormGroup;
  pannes: Pannes[] = [];
  cpannes: Pannes[];
  Tpannes: Pannes[];
  Opannes: Pannes[];
  Detailspannes: Pannes[];
  Outilpannes: Pannes[];
  Hpannes: Pannes[];
  times: Pannes[];
  selectedPanne: Pannes;
  tail: number;
  tails: number;
  count: number;
  ranger: string = "false";
  pages: number = 7;

    cause1: string;
    details1: string;
    desc1: string;
    cause2: string;
    details2: string;
    desc2: string;
    ha1: any;
    di1: any;
    fi1: any;
    ha2: any;
    di2: any;
    fi2: any;
    outil1: any;
    qte1: any;
    ref1: any;
    outil2: any;
    qte2: any;
    ref2: any;
    OP1: any;
    OP2: any;

  @ViewChild('htmlData', {static: false}) htmlData: ElementRef;

  machines: Machine[];
    closeResult: any;

  dataPanne = {
      labels: [],
      datasets: []
  };
    private roles: string[];
    public authority: string;
    term: string;
    p: number;
    f: Date;
    d: Date;

  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private machineService: MachinesService,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private modalService: NgbModal, private _location: Location  ) {
      this.createForm();
      this.createForms();
      this.rangeForms();
      this.pageForms();

  }

  ngOnInit() {
      if (this.tokenStorage.getToken()) {
          this.roles = this.tokenStorage.getAuthorities();
          this.roles.every(role => {
              // 'ROLE_USER_ALPI,,,,,,,'
              if (role === 'ROLE_ADMIN') {
                  this.authority = 'admin';
                  return false;
              } else if (role === 'ROLE_SUPER_ADMIN') {
                  this.authority = 'super_admin';
                  return false;
              } else if (role === 'ROLE_USER_MINDOUROU') {
                  this.authority = 'user_mind';
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
              } else if (role === 'ROLE_RESP_PLACAGE') {
                  this.authority = 'resp_pla';
                  return false;
              } else if (role === 'ROLE_RESP_SCIERIE') {
                  this.authority = 'resp_sci';
                  return false;
              } else if (role === 'ROLE_RESP_BRAZIL') {
                  this.authority = 'resp_bra';
                  return false;
              } else if (role === 'ROLE_RESP_CP') {
                  this.authority = 'resp_cp';
                  return false;
              } else if (role === 'ROLE_RESP_MAINTENANCE') {
                  this.authority = 'resp_maint';
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
    this.ThisMonthPannes();
    this.countAllPannes();
    this.loadTimePannes();
    // this.loadTechPannes();
    // this.TodayPannes();
    this.selectedPanne = new Pannes();
    this.getChart();
    // this.loadHeurePannes(this.selectedPanne);
    // this.wt();
  }

    createForm() {
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

    rangeForms() {
        this.rangeForm = this.fb.group({
            date1: ['', Validators.required],
            date2: ['', Validators.required]
        });
    }

  loadPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getAllPannes().subscribe(
        data => {
          this.pannes = data;
            for (let pin of data){
                this.selectedPanne.numero = pin.numero;
            }
            this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
        },
        () => {
          console.log('chargement des pannes');
          console.log(this.pannes);
        }
    );


  }

  countAllPannes(){

      this.panneService.getCountThisPannes().subscribe(
          data => {
              this.cpannes = data;
              this.count = 0;
              for (let pin of this.cpannes){
                      this.count = this.count + pin.nbre;
              }

          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('Total');
              console.log(this.count);
          }
      );
  }

  countTodayPannes(){

      this.panneService.getCountTodayPannes().subscribe(
          data => {
              this.cpannes = data;
              this.count = 0;
              for (let pin of this.cpannes){
                      this.count = this.count + pin.nbre;
              }
          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('Total');
              console.log(this.count);
          }
      );
  }

  loadTimePannes(){
      this.panneService.getTimePannes().subscribe(
          data => {
              this.times = data;
              this.tails = this.times.length;
              for (let pin of data){
                  this.selectedPanne.heureArret = pin.heureArret;
              }

          }
      );
  }

  loadTechPannes(){

    this.panneService.getTechPannes(this.selectedPanne.numero).subscribe(
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

    this.panneService.getOpPannes(this.selectedPanne.numero).subscribe(
        data => {
          this.Opannes = data;
            this.OP1 = data[0];

            (data.length>1)? this.OP2 = data[1] : this.OP2 = '';
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Techniques');
          console.log(this.Opannes);
        }
    );

    this.panneService.getDetailsPannes(this.selectedPanne.numero).subscribe(
        data => {
          this.Detailspannes = data;
            this.cause1 = data[0].cause;
            this.desc1 = data[0].description;
            this.details1 = data[0].details;

            (data.length>1)? this.cause2 = data[1].cause : this.cause2 = '';
            (data.length>1)? this.desc2 = data[1].description : this.desc2 = '';
            (data.length>1)? this.details2 = data[1].details : this.details2 = '';
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des pannes Techniques');
          console.log(this.Detailspannes);
        }
    );

    this.panneService.getOutilsPannes(this.selectedPanne.numero).subscribe(
        data => {
          this.Outilpannes = data;
          this.outil1 = data[0].outil;
          this.qte1 = data[0].qte;
          this.ref1 = data[0].ref;
            (data.length>1)? this.outil2 = data[1].outil : this.outil2 = '';
            (data.length>1)? this.qte2 = data[1].qte : this.qte2 = '';
            (data.length>1)? this.ref2 = data[1].ref : this.ref2 = '';
          //   this.outil2 = data[1].outil;
          // this.qte2 = data[1].qte;
          // this.ref2 = data[1].ref;

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des outils');
          console.log(this.Outilpannes);
        }
    );

      this.panneService.getHeurePannes(this.selectedPanne.numero).subscribe(
          data => {
              this.Hpannes = data;
              this.tail = this.Hpannes.length;
              this.ha1 = data[0].heure_arret;
              this.di1 = data[0].debut_inter;
              this.fi1 = data[0].fin_inter;
              (data.length > 1)?this.ha2 = data[1].heure_arret: this.ha2  = '';
              (data.length > 1)?this.di2 = data[1].debut_inter: this.di2  = '';
              (data.length > 1)?this.fi2 = data[1].fin_inter: this.fi2  = '';
          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('chargement des heures');
              console.log(this.Hpannes);
              console.log('longueur');
              console.log(this.tail);
          }
      );
  }

  TodayPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getTodayPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  HierPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getHierPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false
        },
        () => {
          console.log('panne hier');
          console.log(this.pannes);
        }
    );
  }

  ThisWeekPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getThisWeekPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
        },
        () => {
          console.log('panne cette semaine');
          console.log(this.pannes);
        }
    );
  }

  LastWeekPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getLastWeekPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  LastMonthPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getLastMonthPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  ThisMonthPannes(){
    this.loader = true;
    this.panneService.getThisMonthPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  LastYearPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getLastYearPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  ThisYearPannes(){
      this.loader = true;
      this.pannes = [];
    this.panneService.getThisYearPannes().subscribe(
        data => {
          this.pannes = data;
          this.loader = false
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false
        },
        () => {
          console.log('panne aujourd\'hui');
          console.log(this.pannes);
        }
    );
  }

  rangeDate(){
      console.log('rien');
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;

      console.log(d1 + ' et '+ d2);
      this.loader = true;
      this.pannes = [];

      this.panneService.getRangeDatePannes(d1, d2).subscribe(
          data => {
              this.pannes = data;
              var x =0;
              for (let pin of this.pannes){
                  x = x + pin.dt;
              }

              console.log('pannes: '+data.length);
              console.log('TDT2: '+x);
              this.loader = false;

          },
          error => {
              console.log('une erreur a été détectée!')
              this.loader = false;
          },
          () => {
              console.log('panne aujourd\'hui');
              console.log(this.pannes);
          }
      );
  }

  open(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
      }, (reason) =>{

          }
      );
  }

  modal(content){
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
      }, (reason) =>{

          }
      );
  }

  getChart(){

      const datasetNbrePanne = {
          label: "Pannes",
          data: [],
          backgroundColor: function(context) {

              var index = context.dataIndex;
              var value = context.dataset.data[index];
              return value > 10 ? '#f65656' :  // draw negative values in red
                  index % 2 ? 'blue' :    // else, alternate values in blue and green
                      'rgba(156, 211, 253, 0.4)';
          },
          borderColor: '#0692fb',
      };

      this.panneService.getCountThisPannes().subscribe(
          list => list.forEach(mach => {
              this.dataPanne.labels.push(mach.machine);
              datasetNbrePanne.data.push(mach.nbre);
          } ) );

      this.dataPanne.datasets.push(datasetNbrePanne);


  }


    swl(pan: Pannes){
        const Swal = require('sweetalert2');
        var content = document.createElement('div');
        content.innerHTML = 'Voulez-vous vraiment supprimer la panne n° <strong>' + pan.numero.toString()+ '</strong> de la machine '+ pan.machine.toString().toLowerCase().bold() +'?';
        Swal.fire({
            title: 'Suppression',
            html: content,
            icon: 'warning',
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
            focusConfirm: false,
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                this.panneService.deletePannes(pan.numero).subscribe(
                    res => {
                        console.log('panne supprimée')
                        this.modalService.dismissAll();
                        this.ThisMonthPannes();
                    }
                );
                Swal.fire({
                    title: 'Suppression !',
                    text: "la panne " + pan.numero.bold() + " a été supprimée avec succès!",
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });


            }
        })
    }

  findSso($event){
      if (this.selectPanForm.controls['periode'].value == 'hp'){
          this.HierPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'ttesp'){
          this.loadPannes();
          this.countAllPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'tp'){
          this.TodayPannes();
          this.countTodayPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'twp'){
          this.ThisWeekPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'lwp'){
          this.LastWeekPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'tmp'){
          this.ThisMonthPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'lmp'){
          this.LastMonthPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'typ'){
          this.ThisYearPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'lyp'){
          this.LastYearPannes();
      }
      if (this.selectPanForm.controls['periode'].value == 'pp'){
          this.ranger = "true";
      }
      else {
          this.ranger = "false";
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

    showMachine(m: Machine){
        console.log('machine' + m.nom);
        this.modalService.dismissAll();
        let url = btoa(m.idM.toString());
        this.router.navigateByUrl("machines/"+url);
    }


}
