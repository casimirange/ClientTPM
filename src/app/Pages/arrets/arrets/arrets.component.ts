import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Arrets} from "../../../Models/arrets";
import {ArretsService} from "../../../services/arrets/arrets.service";
import {MachinesService} from "../../../services/machines/machines.service";
import {Machine} from "../../../Models/machines";
import DateTimeFormat = Intl.DateTimeFormat;
import {Color} from "ng2-charts";
import {DatePipe, Location} from "@angular/common";
import {TokenStorageService} from "../../../auth/token-storage.service";

@Component({
  selector: 'app-arrets',
  templateUrl: './arrets.component.html',
  styleUrls: ['./arrets.component.css']
})
export class ArretsComponent implements OnInit {
  headings = 'Arrêts';
  subheadings = 'Gérez les arrêts machines ';
  icons = 'fa fa-clock fa-spin icon-gradient bg-mixed-hopes';

  public chartOptions: Partial<any>;
    private roles: string[];
    public authority: string;
    mini_loader: boolean = false;

  arretForm: FormGroup;
  rangeForm: FormGroup;
  dashPanForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;

  operation: string = 'add';

  arrets: Arrets[] = [];
  ActiveArret: Arrets[];
  DesactiveArret: Arrets[];

  selectedArret: Arrets;
  newArret: Arrets;
  arr: Arrets;
  machines: Machine[] = [];
  pages: number = 7;
  ranger: string = 'false';
  ranges: string = 'false';
  today: Date;
  typeArret = {
    labels: [] = [],
    nbre: [] = [],
    tdt: [] = []
  };

  titre: string;
  thisYearArret: any[] = [];

    datas = {
        labels: [] = [],
        datasets: [] = []
    };

    pareto = {
        labels: [] = [],
        datasets: [] = []
    };

    public lineChartColors: Color[] = [
        { // red
            backgroundColor: ['#008ffb', '#00e396', '#feb019', '#ff4560', '#775dd0', '#69797e'],
            borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
        },

    ];
    public colorsPARETO: Color[] = [

        { // red Failiure
            backgroundColor: 'rgba(38,186,164,0.2)',
            borderColor: '#26baa4',
            pointBackgroundColor: 'rgba(38,186,164,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(38,186,164,0.8)'
        },
        { // vert MTBF
            backgroundColor: 'rgba(97, 115, 255,0.4)',
            borderColor: '#6173ff',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(97, 115, 255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(97, 115, 255,1)'
        }
    ];
    seriess = [];
    public recapArret: any[] = [];
    taux: number;
    nbre_arret_last_month: number;
    date_this_months: any;
    date_this_month: any = '30 dernier jours';

    term: string;
    p: number;
    f: Date;
    d: Date;
    dat: Date;
    ha: DateTimeFormat;
    di: DateTimeFormat;
    piece: string;
    loader: boolean = false;
    loaderdash: boolean = false;
    loaderpareto: boolean = false;
    loadertype1: boolean = false;
    loadertype2: boolean = false;

  constructor(private arretService: ArretsService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private tokenStorage: TokenStorageService,
              private machineService: MachinesService,private _location: Location) {

      // this.arretService.getThisMonthArret().subscribe(
      //
      //     data => {
      //         this.seriess.push(data.length);
      //         console.log("log", this.seriess)
      //     }
      // );
      //
      // this.chartOptions = {
      //     chart: {
      //         height: 265,
      //         type: "radialBar",
      //     },
      //
      //     series: [this.seriess ? this.seriess : 0],
      //
      //     plotOptions: {
      //         radialBar: {
      //             hollow: {
      //                 margin: 0,
      //                 size: "70%",
      //                 background: "#293450",
      //                 dropShadow: {
      //                     enabled: true,
      //                     top: 0,
      //                     left: 0,
      //                     blur: 3,
      //                     opacity: 0.5
      //                 }
      //             },
      //             track: {
      //                 dropShadow: {
      //                     enabled: true,
      //                     top: 2,
      //                     left: 0,
      //                     blur: 4,
      //                     opacity: 0.15
      //                 }
      //             },
      //             dataLabels: {
      //                 name: {
      //                     offsetY: -10,
      //                     color: "#fff",
      //                     fontSize: "13px"
      //                 },
      //                 value: {
      //                     color: "#fff",
      //                     fontSize: "30px",
      //                     show: true,
      //                     formatter: function (val) {
      //                         return val;
      //                     }
      //                 }
      //             }
      //         }
      //     },
      //     fill: {
      //         type: "gradient",
      //         gradient: {
      //             shade: "dark",
      //             type: "horizontal",
      //             gradientToColors: ["#ABE5A1"],
      //             stops: [0, 100]
      //         }
      //     },
      //     stroke: {
      //         lineCap: "round"
      //     },
      //     labels: ["Arrêts Total"]
      // };
    this.createForm();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.rangeForms();
    this.dashForm();
    this.radialBar();

    this.arr = new Arrets();
    // this.selectedArret = new Arrets();
    var tim = new Date();
    this.today = tim;
    this.date_this_months = this.datePipe.transform(tim, 'MMMM yyyy');



  }

  thisYearArrets(){
      this.mini_loader = true
      this.arretService.getThisYearArret().subscribe(
          data => {
              this.thisYearArret = data;
              this.mini_loader = false
          },
          error => {
              console.log('une erreur a été détectée!')
              this.mini_loader = false
          },
          () => {
              console.log('nbre this year')
              console.log(this.thisYearArret)
          }
      );
  }

  radialBar(){
      this.arretService.getRecapArret().subscribe(

          data => {
              this.recapArret = data;
          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('Total');
              // console.log(this.cdount);
          }
      );

      this.seriess = [];
      this.arretService.getThisMonthArret().subscribe(

          data => {
              this.seriess.push(data.length);
              console.log("log", this.seriess)
              this.chartOptions = {
                  chart: {
                      height: 265,
                      type: "radialBar",
                  },

                  series: [this.seriess ? this.seriess : 0],

                  plotOptions: {
                      radialBar: {
                          hollow: {
                              margin: 0,
                              size: "70%",
                              background: "#293450",
                              dropShadow: {
                                  enabled: true,
                                  top: 0,
                                  left: 0,
                                  blur: 3,
                                  opacity: 0.5
                              }
                          },
                          track: {
                              dropShadow: {
                                  enabled: true,
                                  top: 2,
                                  left: 0,
                                  blur: 4,
                                  opacity: 0.15
                              }
                          },
                          dataLabels: {
                              name: {
                                  offsetY: -10,
                                  color: "#fff",
                                  fontSize: "13px"
                              },
                              value: {
                                  color: "#fff",
                                  fontSize: "30px",
                                  show: true,
                                  formatter: function (val) {
                                      return val;
                                  }
                              }
                          }
                      }
                  },
                  fill: {
                      type: "gradient",
                      gradient: {
                          shade: "dark",
                          type: "horizontal",
                          gradientToColors: ["#ABE5A1"],
                          stops: [0, 100]
                      }
                  },
                  stroke: {
                      lineCap: "round"
                  },
                  labels: ["Arrêts Du Mois"]
              };
          }
      );


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

  dashForm() {
        this.dashPanForm = this.fb.group({
            dashPeriode: [''],
        });
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
    this.thisYearArrets();
    this.loadMachines();
    this.ThisMonthArrets();
    this.initArret();
    this.typeArretThisMonth();
    this.newArret = new Arrets();
    this.dashLast30days();
    // this.radialBar();
    this.paretoArretThisMonth();
  }

  rangeForms() {
    this.rangeForm = this.fb.group({
      date1: ['', [Validators.required]],
      date2: ['', [Validators.required]]
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
    this.machineService.getActiveMachines().subscribe(
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

  TodayArrets(){

    this.arretService.getTodayArret().subscribe(
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

  HierArrets(){

    this.arretService.getHierArret().subscribe(
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

  ThisMonthArrets(){
      this.loader = true
    this.arretService.getThisMonthArret().subscribe(
        data => {
          this.arrets = data;
          this.loader = false
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false
        },
        () => {
          console.log('toutes les Arrets');
          console.log(this.arrets);
        }
    );
  }

  LastMonthArrets(){
    this.loader = true;
    this.arretService.getLastMonthArret().subscribe(
        data => {
          this.arrets = data;
          this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
        },
        () => {
          console.log('toutes les Arrets');
          console.log(this.arrets);
        }
    );
  }

  RangeArrets(){

      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
      this.loader = true;
    this.arretService.getRangeArret(d1, d2).subscribe(
        data => {
          this.arrets = data;
          this.loader = false;
        },
        error => {
          console.log('une erreur a été détectée!')
            this.loader = false;
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
        this.loadertype1 = true;
        this.arretService.getArretTypeThisMonth().subscribe(
            list => list.forEach(mach => {
                this.typeArret.labels.push(mach.type.toUpperCase());
                this.typeArret.nbre.push(mach.nbre);
                this.typeArret.tdt.push(mach.TDT);
            })
            ,
            error => {
                console.log('une erreur a été détectée!')
                this.loadertype1 = false
            },
            () => {
                console.log('rapport');
                this.loadertype1 = false
            }
        );

    }

    typeArretLastMonth(){
        this.typeArret.labels = [];
        this.typeArret.nbre = [];
        this.typeArret.tdt = [];
        this.loadertype1 = true;
        this.arretService.getArretTypeLastMonth().subscribe(
            list => list.forEach(mach => {
                this.typeArret.labels.push(mach.type.toUpperCase());
                this.typeArret.nbre.push(mach.nbre);
                this.typeArret.tdt.push(mach.TDT);
            }),
            error => {
                console.log('une erreur a été détectée!')
                this.loadertype1 = false
            },
            () => {
                console.log('rapport');
                this.loadertype1 = false
            }
        );

    }

    typeArretRange(){
        this.typeArret.labels = [];
        this.typeArret.nbre = [];
        this.typeArret.tdt = [];
        const d1 = this.rangeForm.controls['date1'].value;
        const d2 = this.rangeForm.controls['date2'].value;
        this.date_this_months = d1 +' au '+ d2;
        this.loadertype1 = true;
        this.arretService.getArretTypeRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                this.typeArret.labels.push(mach.type.toUpperCase());
                this.typeArret.nbre.push(mach.nbre);
                this.typeArret.tdt.push(mach.TDT);
            }),
            error => {
                console.log('une erreur a été détectée!')
                this.loadertype1 = false
            },
            () => {
                console.log('rapport');
                this.loadertype1 = false
            }
        );

    }

  addArret() {
    const a = this.arretForm.value;
    console.log('formulaire 1 '+ a);
    const Swal = require('sweetalert2');

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
      if(!this.newArret.date || !this.newArret.debutArret ||
          !this.newArret.finArret || !this.newArret.idMachine ||
          !this.newArret.cause){
          Swal.fire({
              title: 'Impossible',
              text: "Tous les champs ne sont pas correctement remplis",
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#b97a56',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
              showLoaderOnConfirm: true
          })
      }else{
          this.arretService.postArret(this.newArret).subscribe(
              res => {
                  this.initArret();
                  // this.LoadArrets();
                  this.typeArretThisMonth();
                  this.dashLast30days();
                  this.ThisMonthArrets();
                  this.paretoArretThisMonth();
                  this.radialBar();

                  const Toast = Swal.mixin({
                      toast: true,
                      position: 'bottom-end',
                      showConfirmButton: false,
                      background: '#d5f7d3',
                      timer: 5000,
                      timerProgressBar: true,
                      onOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                      }
                  });

                  Toast.fire({
                      icon: 'success',
                      title: 'Arrêt Enregistré'
                  })
              }
          );


      }

  }
  test(tes: Arrets){
        console.log(`mach ${this.selectedArret.idMachine}`)
        console.log(`test ${tes.id_machine}`)
        console.log(`testerrr ${tes.numero}`)
        console.log(tes)
  }

  updateArret() {
      const a = this.arretForm.value;
      const Swal = require('sweetalert2');
      this.arr.date = this.arretForm.controls['date'].value;
      this.arr.cause = this.arretForm.controls['pic1'].value != 'divers' ? this.arretForm.controls['pic1'].value : this.arretForm.controls['cause'].value;
      this.arr.numero = this.selectedArret.numero;
      this.arr.debutArret = this.arretForm.controls['debut'].value;
      this.arr.finArret = this.arretForm.controls['fin'].value;
      this.arr.idMachine = this.arretForm.controls['machine'].value;
      console.log('modif Arrêt :' + a);
      console.log('modif Arrêt2 :' + this.selectedArret.idMachine);
      console.log('modif Arrêt3 :' + this.arr.idArret);

      if(!this.arr.date || !this.arr.debutArret ||
          !this.arr.finArret || !this.arr.idMachine ||
          !this.arr.cause){
          Swal.fire({
          title: 'Impossible',
          text: "Tous les champs ne sont pas correctement remplis",
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#b97a56',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          showLoaderOnConfirm: true
          })
      }else{



    this.arretService.putArret(this.arr, this.selectedArret.numero).subscribe(
        res => {
          this.initArret();
          this.ThisMonthArrets();
            this.typeArretThisMonth();
            this.dashLast30days();
            this.thisYearArrets();
            this.radialBar();

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
                title: 'Arrêt Modifié'
            })
        }
    );
      }
  }

  initArret() {
    this.selectedArret = new Arrets();
    this.createForm();
  }

  swl(tec: Arrets){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Suppression',
      icon: 'error',
      html: "Voulez-vous supprimer l\'arrêt N°" + this.selectedArret.numero.bold()+" ?",
      showCancelButton: true,
      footer: '<a >Cette action est irréversible</a>',
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
          this.ThisMonthArrets();
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


    dashLast30days(){
        this.datas.labels = [];
        this.datas.datasets = [];
        this.date_this_month = "30 derniers jours";
        this.loaderdash = true;
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            backgroundColor: 'red',
            borderColor: '#0692fb',
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.arretService.getCountPerDayPannes().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderdash = false
            },
            () => {
                console.log('rapport');
                this.loaderdash = false
            }
        );
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);
    }

    dashLastMonth(){
        this.datas.labels = [];
        this.datas.datasets = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            backgroundColor: 'red',
            borderColor: '#0692fb',
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.loaderdash = true;
        this.arretService.getCountDashLastPannes().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderdash = false
            },
            () => {
                console.log('rapport');
                this.loaderdash = false
            }
        );
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);
    }

    dashThisMonth(){
        this.datas.labels = [];
        this.datas.datasets = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            backgroundColor: 'red',
            borderColor: '#0692fb',
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.loaderdash = true;
        this.arretService.getCountDashThisPannes().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderdash = false
            },
            () => {
                console.log('rapport');
                this.loaderdash = false
            }
        );
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);
    }

    dashRange(){
        this.datas.labels = [];
        this.datas.datasets = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            backgroundColor: 'red',
            borderColor: '#0692fb',
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        console.log('rien');
        const d1 = this.rangeForm.controls['date1'].value;
        const d2 = this.rangeForm.controls['date2'].value;

        console.log(d1 + ' et '+ d2);
        this.loaderdash = true;
        this.arretService.getCountRangePannes(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderdash = false
            },
            () => {
                console.log('rapport');
                this.loaderdash = false
            }
        );
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);
    }

    paretoArretRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.pareto.labels = [];
        this.pareto.datasets = [];
        const d1 = this.rangeForm.controls['date1'].value;
        const d2 = this.rangeForm.controls['date2'].value;
        this.loaderpareto = true;
        this.arretService.paretoAlpiRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.pareto.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderpareto = false
            },
            () => {
                console.log('rapport');
                this.loaderpareto = false
            }
        );
        this.pareto.datasets.push(datasetNbrePanne3);
        this.pareto.datasets.push(datasetNbrePanne4);
    }

    paretoArretThisMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.pareto.labels = [];
        this.pareto.datasets = [];
        this.loaderpareto = true;
        this.arretService.paretoAlpiThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.pareto.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderpareto = false
            },
            () => {
                console.log('rapport');
                this.loaderpareto = false
            }
        );
        this.pareto.datasets.push(datasetNbrePanne3);
        this.pareto.datasets.push(datasetNbrePanne4);
    }

    paretoArretLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Arrêt",
            yAxisID: 'y-axis-0',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.pareto.labels = [];
        this.pareto.datasets = [];
        this.loaderpareto = true;
        this.arretService.paretoAlpiLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.pareto.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            } ),
            error => {
                console.log('une erreur a été détectée!')
                this.loaderpareto = false
            },
            () => {
                console.log('rapport');
                this.loaderpareto = false
            }
        );
        this.pareto.datasets.push(datasetNbrePanne3);
        this.pareto.datasets.push(datasetNbrePanne4);
    }

    suiviJournalier($event){
        if (this.dashPanForm.controls['dashPeriode'].value == 'l30d'){
            this.dashLast30days();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'tmp'){
            this.dashThisMonth();
            this.typeArretThisMonth();
            this.paretoArretThisMonth()
            const dat = new Date();
            this.date_this_months = this.datePipe.transform(dat, 'MMMM yyyy');
            // this.StatistiquesTechniciens();
            // this.ThisMonthPannes();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'lmp'){
            this.dashLastMonth();
            this.typeArretLastMonth();
            this.paretoArretLastMonth()
            const dat = new Date();
            const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMMM yyyy');
            this.date_this_months = dat1;
            // this.StatistiquesTechniciensLastMonth();
            // this.LastMonthPannes();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'pp'){
            this.ranger = "true";
        }
        else {
            this.ranger = "false";
        }
    }

    findSso($event){
        if (this.selectPanForm.controls['periode'].value == 'hp'){
            this.HierArrets();
        }
        if (this.selectPanForm.controls['periode'].value == 'tp'){
            this.TodayArrets();
        }
        if (this.selectPanForm.controls['periode'].value == 'tmp'){
            this.ThisMonthArrets();
            this.dashThisMonth();
            this.typeArretThisMonth();
            this.paretoArretThisMonth()
            const dat = new Date();
            this.date_this_months = this.datePipe.transform(dat, 'MMMM yyyy');
            this.date_this_month = this.datePipe.transform(dat, 'MMMM yyyy');
        }
        if (this.selectPanForm.controls['periode'].value == 'lmp'){
            this.LastMonthArrets();
            this.dashLastMonth();
            this.typeArretLastMonth();
            this.paretoArretLastMonth()
            const dat = new Date();
            const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMMM yyyy');
            this.date_this_months = dat1;
            this.date_this_month = dat1;
        }
        if (this.selectPanForm.controls['periode'].value == 'pp'){
            this.ranger = "true";
        }
        else {
            this.ranger = "false";
        }
    }

}
