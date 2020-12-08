import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Pannes} from "../../Models/pannes";
import {DatePipe, Location} from "@angular/common";
import {Color} from "ng2-charts";
import {ApexXAxis, NgApexchartsModule} from "ng-apexcharts";
import {AlpicamService} from "../../services/alpicam/alpicam.service";
import {DepartementsService} from "../../services/departements/departements.service";
import {Departement} from "../../Models/departement";
// import {ApexOptions} from 'apexcharts'
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RapportService} from "../../services/rapport/rapport.service";
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';
import {TokenStorageService} from "../../auth/token-storage.service";
import {toTitleCase} from "codelyzer/util/utils";
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';




@Component({
  selector: 'app-stats-global',
  templateUrl: './stats-global.component.html',
  styleUrls: ['./stats-global.component.css']
})
export class StatsGlobalComponent implements OnInit {
  headings = 'Statistiques Alpicam';
  subheadings = 'Découvrez les données statistiques de l\'entreprise ';
  icons = 'pe-7s-graph icon-gradient bg-royal';
  rapport: boolean = false;
  filtrer: boolean = false;
  filt: boolean = false;
  dashPanForm: FormGroup;
  pageForm: FormGroup;
  rapportRangeForm: FormGroup;
  pages: number = 6;
  departements: Departement[];
  pannes: Pannes[];
  cdount: number;
  cdpannes: Pannes[];
  py: Pannes[];
  pm: Pannes[];
  pt: Pannes[];
  mtbfY: Pannes[];
  mtbfTY: Pannes[];
  mtbf: Pannes[];
  stats: any[] = [];

  mdtByYear = {
    labels: [] = [],
    datasets: [] = []
  };

  mtbfByYear = {
    labels: [] = [],
    datasets: [] = []
  };

  datas = {
    labels: [] = [],
    datasets: [] = []
  };

  graph = {
    labels: []= [],
    datasets: []= []
  };

  catP = {
    labels: [],
    datasets: []
  };

  dta = [];

  public colorsMTBF: Color[] = [
    { // vert MTBF
      backgroundColor: 'rgba(146, 208, 80, 0.7)',
      borderColor: '#000',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(146, 208, 80, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(146, 208, 80, 1)'
    },
    { // bleu TDT
      backgroundColor: 'rgba(91, 155, 213, 0.7)',
      borderColor: '#000',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 1,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#148fde',
      pointBackgroundColor: '#fff',
      // pointHoverBorderWidth: 4,
      // pointRadius: 6,
      // pointBorderWidth: 5,
      // pointHoverRadius: 8,
      // pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#148fde',
    },
    { // red Failiure
      backgroundColor: 'transparent',
      borderColor: '#ff4560',
      pointBackgroundColor: 'rgba(225,69,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,69,96,0.8)'
    }
  ];

  public colorsMDT: Color[] = [
    { // vert MTBF
      backgroundColor: 'rgba(237, 125, 49, 0.7)',
      borderColor: '#000',
      borderWidth: 1,
      pointBackgroundColor: 'rgba(237, 125, 49, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(237, 125, 49, 1)'
    },
    { // bleu TDT
      backgroundColor: 'rgba(91, 155, 213, 0.7)',
      borderColor: '#000',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 1,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#148fde',
      pointBackgroundColor: '#fff',
      // pointHoverBorderWidth: 4,
      // pointRadius: 6,
      // pointBorderWidth: 5,
      // pointHoverRadius: 8,
      // pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#148fde',
    },
    { // red Failiure
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public colorsPARETO: Color[] = [

    { // red Failiure
      backgroundColor: 'rgba(0,183,195,0.2)',
      borderColor: '#00b7c3',
      pointBackgroundColor: 'rgba(0, 183, 195,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 183, 195,0.8)'
    },
    { // vert MTBF
      backgroundColor: 'rgba(119, 93, 208,0.4)',
      borderColor: '#775dd0',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(119, 93, 208,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(119, 93, 208,1)'
    }
  ];

  public colorsGraph: Color[] = [

    { // red Failiure
      backgroundColor: 'rgba(0, 143, 251, 1)',
      // backgroundColor: 'rgba(0, 143, 251, 0.2)',
      borderColor: '#008ffb',
    },
    { // vert MTBF
      backgroundColor: 'rgba(0, 227, 150, 1)',
      // backgroundColor: 'rgba(0, 227, 150, 0.4)',
      borderColor: '#00e396',
    },
    { // red Failiure
      backgroundColor: 'rgba(254, 176, 25, 1)',
      // backgroundColor: 'rgba(254, 176, 25, 0.2)',
      borderColor: '#feb019',
    },
    { // vert MTBF
      backgroundColor: 'rgba(255, 69, 96, 1)',
      // backgroundColor: 'rgba(255, 69, 96, 0.4)',
      borderColor: '#ff4560',
    },
    { // vert MTBF
      backgroundColor: 'rgba(41, 52, 80, 1)',
      // backgroundColor: 'rgba(41, 52, 80, 0.4)',
      borderColor: '#293450',
    }
  ];
  public labs = {
    categories: []
  };

  test = {
    datasets: []
  };

  public datas1 = {
    categories: []
  };

  test1 = {
    series: [],
    labels: [],
  };

  test2 = [];

  public type = {
    height: '500',
    type: "line",
    zoom: {
      enabled: false
    }
  };

  public pie = {
    height: 200,
    type: 'pie',
    zoom: {
      enabled: false
    }
  };
  title = {
    text: "Répartition des Types de Panne",
    align: "left"
  };
  alpiTY: any[];
  alpiLY: any[];
  tab: any[];

  ridotto: any[] = [];
  sec_pla: any[] = [];
  sec_bra: any[] = [];
  sec_sci: any[] = [];
  sec_cp: any[] = [];
  sec_alpi: any[] = [];
  _pla2: any[] = [];
  _bra2: any[] = [];
  _sci2: any[] = [];
  _cp2: any[] = [];
  _alpi2: any[] = [];
  section: string = "Alpicam";

  series: any[];
  datS1: any;
  datS2: any;
  datS3: any;
  datS4: any;
  date_this_months: any;
  f: Date;
  d: Date;
  f1: Date;
  d1: Date;
  f2: Date;
  d2: Date;

  hihi: string[] = ["alpicam", "placage", "brazil", "cp", "scierie"]
  loader: boolean = false;
  loaderPareto: boolean = false;
  loadertype: boolean = false;
  loaderrecap: boolean = false;
  loaderrapport: boolean = false;
  b1: boolean = false;
  b2: boolean = false;
  b3: boolean = false;
  b4: boolean = false;
  b5: boolean = false;
  b6: boolean = false;
  b7: boolean = false;
  b8: boolean = false;
  b9: boolean = false;
  b0: boolean = false;
  chargement: boolean = false;

  pdfMake = require('pdfmake/build/pdfmake.js');

  pdfFonts = require('pdfmake/build/vfs_fonts.js');

  public rangeForm: FormGroup;
  public ranges: string = 'false';

  Swal: any = require('sweetalert2');

  private roles: string[];
  public authority: string;

  tab1: any[] = [];
  tab2: any[] = [];
  tab3: any[] = [];
  tab4: any[] = [];
  tab5: any[] = [];

  dater: any;

  constructor(private dashboardService: DashboardService,
              private rapportService: RapportService,
              private datePipe: DatePipe,
              private router: Router,
              private token: TokenStorageService,
              private fb: FormBuilder,
              private departementService: DepartementsService,
              private alpicamService: AlpicamService,
              private tokenStorage: TokenStorageService,private _location: Location) {
    this.dashForm();
    this.rangeForms();
    this.rapportForms();
    this.pageForms();
    this.statsPanne();

    this.pdfMake.vfs = this.pdfFonts.pdfMake.vfs;

  }

  pageForms() {
    this.pageForm = this.fb.group({
      page: ['']
    });
  }

  dashForm() {
    this.dashPanForm = this.fb.group({
      dashPeriode: [''],
    });
  }

  rangeForms() {
    this.rangeForm = this.fb.group({
      date1: ['', [Validators.required]],
      date2: ['', [Validators.required]]
    });
  }

  rapportForms() {
    this.rapportRangeForm = this.fb.group({
      date1: ['', [Validators.required]],
      date2: ['', [Validators.required]],
      date3: ['', [Validators.required]],
      date4: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.mtbfAlpicam();
    this.paretoAlpiThisMonth();
    this.typePanneThisMonth();
    this.loadDepartements();
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      const Swal = require('sweetalert2');
      var content = document.createElement('div');
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
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

    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.date_this_months = this.datePipe.transform(datm, 'MMMM yyyy');


    // this.alpicam();
    // this.alpicamRapport();
    // this.placageRapport();
    // this.brazilRapport();
    // this.contreplaqueRapport();
    // this.scierieRapport();

    this.load()
  }
  load(){
    this.loaderrapport = true;
    this.b1 = true;
    this.b2 = true;
    this.b3 = true;
    this.b4 = true;
    this.b5 = true;
    this.rapportService.getRidottos().subscribe(
        data => {
          if (!this.sec_alpi.length){
            this.sec_alpi = data;
            this.ridotto = data;
            this.b1 = false;
            this.loaderrapport = false;
            console.log('this.ridotto ', this.sec_alpi)
          }

          this.rapportService.getPlacages().subscribe(
              data1 => {
                if (!this.sec_pla.length){
                  this.sec_pla = data1;
                  this.b2 = false;
                  console.log('this.pl ', this.sec_pla)
                }
                // this.sec_pla = data;
                // this.b2 = false;

                this.rapportService.getBrazils().subscribe(
                    data2 => {
                      if (!this.sec_bra.length){
                        this.sec_bra = data2;
                        this.b3 = false;
                        console.log('this.b ', this.sec_bra)
                      }
                      // this.sec_bra = data;
                      // this.b3 = false;

                      this.rapportService.getContreplaques().subscribe(
                          data3 => {
                            if (!this.sec_cp.length){
                              this.sec_cp = data3;
                              this.b4 = false;
                              console.log('this.c ', this.sec_cp)
                            }
                            // this.sec_cp = data;
                            // this.b4 = false;

                            this.rapportService.getScieries().subscribe(
                                data4 => {
                                  if (!this.sec_sci.length){
                                    this.sec_sci = data4;
                                    this.b5 = false;
                                    console.log('this.s ', this.sec_sci)
                                  }
                                  console.log('this.sdza ', this.sec_alpi)
                                },
                            );
                          },
                      );
                    },
                );
              },
          );
        },
    );

    // this.tab1 = this.sec_alpi;
    // this.tab2 = this.sec_bra;
    // this.tab3 = this.sec_pla;
    // this.tab4 = this.sec_cp;
    // this.tab5 = this.sec_sci;
  }

  load2(){
    this.b1 = true;
    this.b2 = true;
    this.b3 = true;
    this.b4 = true;
    this.b5 = true;
    this.sec_alpi = [];
    this.sec_pla = [];
    this.sec_bra = [];
    this.sec_cp = [];
    this.sec_sci = [];
    this.rapportService.getRidottos().subscribe(
        data => {
          if (!this.sec_alpi.length){
            this.sec_alpi = data;
            this.b1 = false;
            console.log('this.ridotto ', this.sec_alpi)
          }

          this.rapportService.getPlacages().subscribe(
              data1 => {
                if (!this.sec_pla.length){
                  this.sec_pla = data1;
                  this.b2 = false;
                  console.log('this.pl ', this.sec_pla)
                }
                // this.sec_pla = data;
                // this.b2 = false;

                this.rapportService.getBrazils().subscribe(
                    data2 => {
                      if (!this.sec_bra.length){
                        this.sec_bra = data2;
                        this.b3 = false;
                        console.log('this.b ', this.sec_bra)
                      }
                      // this.sec_bra = data;
                      // this.b3 = false;

                      this.rapportService.getContreplaques().subscribe(
                          data3 => {
                            if (!this.sec_cp.length){
                              this.sec_cp = data3;
                              this.b4 = false;
                              console.log('this.c ', this.sec_cp)
                            }
                            // this.sec_cp = data;
                            // this.b4 = false;

                            this.rapportService.getScieries().subscribe(
                                data4 => {
                                  if (!this.sec_sci.length){
                                    this.sec_sci = data4;
                                    this.b5 = false;
                                    console.log('this.s ', this.sec_sci)
                                  }
                                  console.log('this.sdza ', this.sec_alpi)
                                },
                            );
                          },
                      );
                    },
                );
              },
          );
        },
    );
  }

  loads(){
    this.loaderrapport = true;
    this.b6 = true;
    this.b7 = true;
    this.b8 = true;
    this.b9 = true;
    this.b0 = true;

    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.loaderrapport = true;
    this._alpi2 = [];
    this._pla2 = [];
    this._bra2 = [];
    this._cp2 = [];
    this._sci2 = [];

    this.rapportService.getRidottoRange(d1, d2, d3, d4).subscribe(
        data => {
          if(!this._alpi2.length){
            this._alpi2 = data;
            this.b6 = false;
          }

          this.rapportService.getPlacageRange(d1, d2, d3, d4).subscribe(
              data => {
                if (!this._pla2.length){
                  this._pla2 = data;
                  this.b7 = false;
                }

                this.rapportService.getBrazilRange(d1, d2, d3, d4).subscribe(
                    data => {
                      if (!this._bra2.length){
                        this._bra2 = data;
                        this.b8 = false;
                      }

                      this.rapportService.getContreplaqueRange(d1, d2, d3, d4).subscribe(
                          data => {
                            if (!this._cp2.length){
                              this._cp2 = data;
                              this.b9 = false;
                            }

                            this.rapportService.getScierieRange(d1, d2, d3, d4).subscribe(
                                data => {
                                  if (!this._sci2.length){
                                    this._sci2 = data;
                                    this.b0 = false;
                                  }
                                }
                            );
                          }
                      );
                    }
                );
              }
          );
        }
    );


    // this.rapportService.getRidottos().subscribe(
    //     data => {
    //       if (!this.sec_alpi.length){
    //         this.sec_alpi = data;
    //         this.ridotto = data;
    //         this.b1 = false;
    //         this.loaderrapport = false;
    //         console.log('this.ridotto ', this.sec_alpi)
    //       }
    //
    //       this.rapportService.getPlacages().subscribe(
    //           data1 => {
    //             if (!this.sec_pla.length){
    //               this.sec_pla = data1;
    //               this.b2 = false;
    //               console.log('this.pl ', this.sec_pla)
    //             }
    //             // this.sec_pla = data;
    //             // this.b2 = false;
    //
    //             this.rapportService.getBrazils().subscribe(
    //                 data2 => {
    //                   if (!this.sec_bra.length){
    //                     this.sec_bra = data2;
    //                     this.b3 = false;
    //                     console.log('this.b ', this.sec_bra)
    //                   }
    //                   // this.sec_bra = data;
    //                   // this.b3 = false;
    //
    //                   this.rapportService.getContreplaques().subscribe(
    //                       data3 => {
    //                         if (!this.sec_cp.length){
    //                           this.sec_cp = data3;
    //                           this.b4 = false;
    //                           console.log('this.c ', this.sec_cp)
    //                         }
    //                         // this.sec_cp = data;
    //                         // this.b4 = false;
    //
    //                         this.rapportService.getScieries().subscribe(
    //                             data4 => {
    //                               if (!this.sec_sci.length){
    //                                 this.sec_sci = data4;
    //                                 this.b5 = false;
    //                                 console.log('this.s ', this.sec_sci)
    //                               }
    //                               console.log('this.sdza ', this.sec_alpi)
    //                             },
    //                         );
    //                       },
    //                   );
    //                 },
    //             );
    //           },
    //       );
    //     },
    // );

    // this.tab1 = this.sec_alpi;
    // this.tab2 = this.sec_bra;
    // this.tab3 = this.sec_pla;
    // this.tab4 = this.sec_cp;
    // this.tab5 = this.sec_sci;
  }

  async downloads(){
    const dat = new Date();
    const min = 'min';
    const tab = this.ridotto
    const user = this.token.getUsername();
    const dat1 = this.datS3;
    const dat2 = this.datS4;
    const dat3 = this.datS1;
    const dat4 = this.datS2;

    this.b1 = true;
    this.b2 = true;
    this.b3 = true;
    this.b4 = true;
    this.b5 = true;

      var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [40, 60, 40, 60],
        footer: function (currentPage, pageCount) {
          return {
            columns: [
              {
                text: window.location.toString()+' généré par: ' + user,
                fontSize: 8,
                italics: true,
                margin: [40, 20, 0, 0],
                alignment: 'left'
              },
              // { text: 'from acon-stats produced by '+this.token.getUsername().bold(), fontSize: 8, italics: true, margin: [ 10, 10, 0, 0 ], alignment: 'left'},
              {
                text: currentPage.toString() + '/' + pageCount,
                fontSize: 8,
                italics: true,
                margin: [0, 20, 40, 0],
                alignment: 'right'
              }
            ],
          }
        },
        header: {
          columns: [
            {
              image: await this.getBase64ImageFromURL("/assets/images/logo24.png"),
              width: 87,
              height: 22,
              margin: [40, 12, 0, 0],
              alignment: 'left'
            },
            // {
            //   text: 'Rapport de Maintenance ALPICAM Industries',
            //   alignment: 'center',
            //   fontSize: 8,
            //   italics: true,
            //   margin: [0, 12, 0, 0],
            // },
            {
              text: 'Rapport de Maintenance ALPICAM Industries. Exporté le: ' + this.datePipe.transform(dat, 'dd/MM/yyyy'),
              bold: true, fontSize: 8, italics: true,
              alignment: 'right',
              margin: [0, 12, 40, 0],
            }
          ]
        },

        background: function(){
          return [
            {
              image: 'bee',
              height: 42,
              margin: [0, 0, 0, 0],
            }
          ];
        },

        images: {
          bee: await this.getBase64ImageFromURL("/assets/images/test.png"),
        },


        info: {
          title: 'Rapport de Maintenance - ' + this.datePipe.transform(dat, 'MMM-yyyy'),
          author: user,
          subject: 'Total Productive Maintenance',
          creator: 'ACON',
          producer: user,
          creationDate: this.datePipe.transform(dat, 'dd/MM/yyyy HH:mm')
        },
        content: [
          {
            text: 'TOTAL PRODUCTIVE MAINTENANCE',
            fontSize: 16, bold: true, alignment: 'center',
            decoration: 'underline', decorationStyle: 'double',
            margin: [0, 0, 0, 100]
          },
          {
            image: await this.getBase64ImageFromURL("/assets/images/TPM2.jpg"),
            width: 400,
            height: 300,
            alignment: 'center',
            margin: [0, 0, 0, 60]
          },
          {
            text: [
              {
                text: 'Le présent document fait état de la situation des pannes de l\'entreprise entre les périodes allant du ',
                fontSize: 12
              },
              {
                text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 12,
                bold: true
              },
              {text: ' et celle du ', fontSize: 12,},
              {
                text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 12,
                bold: true
              }
            ]
          },
          {
            margin: [0, 80],
            columns: [
              {
                text: [
                  {
                    text: 'Généré Par :\n',
                    fontSize: 13,
                    italics: true,
                    bold: true,
                    alignment: 'left',
                    decoration: 'underline',
                    margin: [0, 10]
                  },
                  {
                    text: [
                      {text: user, fontSize: 12, alignment: 'left',},
                    ],
                  },
                ]
              },
              {
                qr: 'Rapport TPM Alpicam Industries, genere le : ' + this.datePipe.transform(dat, 'dd/MM/yyyy HH:mm') + ' par ' + user,
                fit: '100',
                alignment: 'right',
                width: 100,
                height: 100,
              },

            ]
          },
          {
            text: 'EXPLICATIONS DES ABBREVIATIONS',
            fontSize: 16,
            decoration: 'underline',
            alignment: 'center',
            decorationStyle: 'double',
            margin: [0, 0, 0, 40],
            pageBreak: 'before',
            pageOrientation: 'portrait',
          },
          {
            text: [
              {text: 'N°1: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {
                text: 'Nombre de pannes de la période comprise entre ' + this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 12,
              }
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: 'N°2: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {
                text: 'Nombre de pannes de la période comprise entre ' + this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 12,
              }
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: '%N°: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {text: 'Taux d\'évolution (en %) des pannes entre les deux périodes ', fontSize: 12,}
            ], margin: [0, 0, 0, 20]
          },

          {
            text: [
              {text: 'TDT1: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {
                text: 'Total Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 12,
              }
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: 'TDT2: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {
                text: 'Total Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 12,
              }
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: '%TDT: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {text: 'Taux d\'évolution (en %) du Total Down Time entre les deux périodes ', fontSize: 12,}
            ], margin: [0, 0, 0, 20]
          },

          {
            text: [
              {text: 'MDT1: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {
                text: 'Mean Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 12,
              }
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: 'MDT2: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {
                text: 'Mean Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 12,
              }
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: '%MDT: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
              {text: 'Taux d\'évolution (en %) du Mean Down Time entre les deux périodes ', fontSize: 12,}
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: '%: ', fontSize: 12, color: '#d92550', bold: true, alignment: 'left',},
              {text: 'Augmentation ', fontSize: 12,}
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: '%: ', fontSize: 12, color: '#3ac47d', bold: true, alignment: 'left',},
              {text: 'Baisse ', fontSize: 12,}
            ], margin: [0, 0, 0, 20]
          },
          {
            text: [
              {text: '%: ', fontSize: 12, color: '#f7b924', bold: true, alignment: 'left',},
              {text: 'Constant ', fontSize: 12,}
            ], margin: [0, 0, 0, 20]
          },

          {
            text: [
              {text: 'Tableau Comparatif ', fontSize: 13},
              {text: 'Alpicam: ', fontSize: 13, color: '#0b5885'},
              {
                text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true
              },
              {text: ' VS ', fontSize: 13,},
              {
                text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true,
                margin: [0, 0, 0, 20]
              },
            ],
            pageBreak: 'before',
            pageOrientation: 'landscape',
          },

          this.getTable(this.sec_alpi),
          {
            text: [
              {text: 'Tableau Comparatif ', fontSize: 13},
              {text: 'Brazil: ', fontSize: 13, color: '#0b5885'},
              {
                text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true
              },
              {text: ' VS ', fontSize: 13,},
              {
                text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true
              },
            ],
            margin: [0, 20]
          },
          this.getTable(this.sec_bra),

          {
            text: [
              {text: 'Tableau Comparatif ', fontSize: 13},
              {text: 'Placage: ', fontSize: 13, color: '#0b5885'},
              {
                text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true
              },
              {text: ' VS ', fontSize: 13,},
              {
                text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true,
              },
            ], margin: [0, 0, 0, 20],
            pageBreak: 'before',
            pageOrientation: 'landscape',
          },
          this.getTable(this.sec_pla),
          {
            text: [
              {text: 'Tableau Comparatif ', fontSize: 13},
              {text: 'Contreplaqué: ', fontSize: 13, color: '#0b5885'},
              {
                text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true
              },
              {text: ' VS ', fontSize: 13,},
              {
                text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true,
              },
            ], margin: [0, 20]
          },
          this.getTable(this.sec_cp),
          {
            text: [
              {text: 'Tableau Comparatif ', fontSize: 13},
              {text: 'Scierie: ', fontSize: 13, color: '#0b5885'},
              {
                text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true
              },
              {text: ' VS ', fontSize: 13,},
              {
                text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
                fontSize: 13,
                bold: true,
              },
            ], margin: [0, 20]
          },
          this.getTable(this.sec_sci),

        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],

          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5]
          },
          tableExample: {
            margin: [0, 5, 0, 15]
          },
          tableOpacityExample: {
            margin: [0, 5, 0, 15],
            fillColor: 'blue',
            fillOpacity: 0.3
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            fillColor: '#d0eeff',
            fontFamily: 'Roboto',
            alignement: 'left',
            color: '#0b5885',
          },
          td: {
            bold: false,
            fontSize: 10,
            fillColor: '#fff',
            fontFamily: 'Roboto',
            alignement: 'left',
            color: '#000',
          },
          tv: {
            bold: false,
            fontSize: 10,
            fillColor: '#fff',
            fontFamily: 'Roboto',
            alignement: 'left',
            color: '#3ac47d',
          },
          tr: {
            bold: false,
            fontSize: 10,
            fillColor: '#fff',
            fontFamily: 'Roboto',
            alignement: 'left',
            color: '#d92550',
          },
          tj: {
            bold: false,
            fontSize: 10,
            fillColor: '#fff',
            fontFamily: 'Roboto',
            alignement: 'left',
            color: '#f7b924',
          }
        },

      };
      // this.pdfMake.createPdf(docDefinition).download('Rapport de Maintenance - ' + this.datePipe.transform(dat, 'MMM-yyyy'));
      this.pdfMake.createPdf(docDefinition).open();
  }

  async downloads_filtre(){
    const dat = new Date();
    const min = 'min';
    const tab = this.ridotto
    const user = this.token.getUsername();

    const dat1 = this.rapportRangeForm.controls['date1'].value;
    const dat2 = this.rapportRangeForm.controls['date2'].value;
    const dat3 = this.rapportRangeForm.controls['date3'].value;
    const dat4 = this.rapportRangeForm.controls['date4'].value;


    var docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [40, 60, 40, 60],
      footer: function (currentPage, pageCount) {
        return {
          columns: [
            {
              text: window.location.toString()+' généré par: ' + user,
              fontSize: 8,
              italics: true,
              margin: [40, 20, 0, 0],
              alignment: 'left'
            },
            // { text: 'from acon-stats produced by '+this.token.getUsername().bold(), fontSize: 8, italics: true, margin: [ 10, 10, 0, 0 ], alignment: 'left'},
            {
              text: currentPage.toString() + '/' + pageCount,
              fontSize: 8,
              italics: true,
              margin: [0, 20, 40, 0],
              alignment: 'right'
            }
          ],
        }
      },
      header: {
        columns: [
          {
            image: await this.getBase64ImageFromURL("/assets/images/logo24.png"),
            width: 87,
            height: 22,
            margin: [40, 12, 0, 0],
            alignment: 'left'
          },
          // {
          //   text: 'Rapport de Maintenance ALPICAM Industries',
          //   alignment: 'center',
          //   fontSize: 8,
          //   italics: true,
          //   margin: [0, 12, 0, 0],
          // },
          {
            text: 'Rapport de Maintenance ALPICAM Industries. Exporté le: ' + this.datePipe.transform(dat, 'dd/MM/yyyy'),
            bold: true, fontSize: 8, italics: true,
            alignment: 'right',
            margin: [0, 12, 40, 0],
          }
        ]
      },

      background: function(){
        return [
          {
            image: 'bee',
            height: 42,
            margin: [0, 0, 0, 0],
          }
        ];
      },

      images: {
        bee: await this.getBase64ImageFromURL("/assets/images/test.png"),
      },


      info: {
        title: 'Rapport de Maintenance - ' + this.datePipe.transform(dat, 'MMM-yyyy'),
        author: user,
        subject: 'Total Productive Maintenance',
        creator: 'ACON',
        producer: user,
        creationDate: this.datePipe.transform(dat, 'dd/MM/yyyy HH:mm')
      },
      content: [
        {
          text: 'TOTAL PRODUCTIVE MAINTENANCE',
          fontSize: 16, bold: true, alignment: 'center',
          decoration: 'underline', decorationStyle: 'double',
          margin: [0, 0, 0, 100]
        },
        {
          image: await this.getBase64ImageFromURL("/assets/images/TPM2.jpg"),
          width: 400,
          height: 300,
          alignment: 'center',
          margin: [0, 0, 0, 60]
        },
        {
          text: [
            {
              text: 'Le présent document fait état de la situation des pannes de l\'entreprise entre les périodes allant du ',
              fontSize: 12
            },
            {
              text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 12,
              bold: true
            },
            {text: ' et celle du ', fontSize: 12,},
            {
              text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 12,
              bold: true
            }
          ]
        },
        {
          margin: [0, 80],
          columns: [
            {
              text: [
                {
                  text: 'Généré Par :\n',
                  fontSize: 13,
                  italics: true,
                  bold: true,
                  alignment: 'left',
                  decoration: 'underline',
                  margin: [0, 10]
                },
                {
                  text: [
                    {text: user, fontSize: 12, alignment: 'left',},
                  ],
                },
              ]
            },
            {
              qr: 'Rapport TPM Alpicam Industries, Genere le : ' + this.datePipe.transform(dat, 'dd/MM/yyyy HH:mm') + ' par ' + user,
              fit: '100',
              alignment: 'right',
              width: 100,
              height: 100,
            },

          ]
        },
        {
          text: 'EXPLICATIONS DES ABBREVIATIONS',
          fontSize: 16,
          decoration: 'underline',
          alignment: 'center',
          decorationStyle: 'double',
          margin: [0, 0, 0, 40],
          pageBreak: 'before',
          pageOrientation: 'portrait',
        },
        {
          text: [
            {text: 'N°1: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {
              text: 'Nombre de pannes de la période comprise entre ' + this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 12,
            }
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: 'N°2: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {
              text: 'Nombre de pannes de la période comprise entre ' + this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 12,
            }
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: '%N°: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {text: 'Taux d\'évolution (en %) des pannes entre les deux périodes ', fontSize: 12,}
          ], margin: [0, 0, 0, 20]
        },

        {
          text: [
            {text: 'TDT1: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {
              text: 'Total Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 12,
            }
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: 'TDT2: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {
              text: 'Total Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 12,
            }
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: '%TDT: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {text: 'Taux d\'évolution (en %) du Total Down Time entre les deux périodes ', fontSize: 12,}
          ], margin: [0, 0, 0, 20]
        },

        {
          text: [
            {text: 'MDT1: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {
              text: 'Mean Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 12,
            }
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: 'MDT2: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {
              text: 'Mean Down Time (en min) de la période comprise entre ' + this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' et ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 12,
            }
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: '%MDT: ', fontSize: 12, color: '#0b5885', bold: true, alignment: 'left',},
            {text: 'Taux d\'évolution (en %) du Mean Down Time entre les deux périodes ', fontSize: 12,}
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: '%: ', fontSize: 12, color: '#d92550', bold: true, alignment: 'left',},
            {text: 'Indique qu\'il y a une Augmentation ', fontSize: 12,}
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: '%: ', fontSize: 12, color: '#3ac47d', bold: true, alignment: 'left',},
            {text: 'Indique qu\'il y a une Baisse ', fontSize: 12,}
          ], margin: [0, 0, 0, 20]
        },
        {
          text: [
            {text: '%: ', fontSize: 12, color: '#f7b924', bold: true, alignment: 'left',},
            {text: 'Indique qu\'il y a une Constante ', fontSize: 12,}
          ], margin: [0, 0, 0, 20]
        },

        {
          text: [
            {text: 'Tableau Comparatif ', fontSize: 13},
            {text: 'Alpicam: ', fontSize: 13, color: '#0b5885'},
            {
              text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true
            },
            {text: ' VS ', fontSize: 13,},
            {
              text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true,
              margin: [0, 0, 0, 20]
            },
          ],
          pageBreak: 'before',
          pageOrientation: 'landscape',
        },

        this.getTable(this._alpi2),
        {
          text: [
            {text: 'Tableau Comparatif ', fontSize: 13},
            {text: 'Brazil: ', fontSize: 13, color: '#0b5885'},
            {
              text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true
            },
            {text: ' VS ', fontSize: 13,},
            {
              text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true
            },
          ],
          margin: [0, 20]
        },
        this.getTable(this._bra2),

        {
          text: [
            {text: 'Tableau Comparatif ', fontSize: 13},
            {text: 'Placage: ', fontSize: 13, color: '#0b5885'},
            {
              text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true
            },
            {text: ' VS ', fontSize: 13,},
            {
              text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true,
            },
          ], margin: [0, 0, 0, 20],
          pageBreak: 'before',
          pageOrientation: 'landscape',
        },
        this.getTable(this._pla2),
        {
          text: [
            {text: 'Tableau Comparatif ', fontSize: 13},
            {text: 'Contreplaqué: ', fontSize: 13, color: '#0b5885'},
            {
              text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true
            },
            {text: ' VS ', fontSize: 13,},
            {
              text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true,
            },
          ], margin: [0, 20]
        },
        this.getTable(this._cp2),
        {
          text: [
            {text: 'Tableau Comparatif ', fontSize: 13},
            {text: 'Scierie: ', fontSize: 13, color: '#0b5885'},
            {
              text: this.datePipe.transform(dat1, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat2, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true
            },
            {text: ' VS ', fontSize: 13,},
            {
              text: this.datePipe.transform(dat3, 'dd/MM/yyyy') + ' au ' + this.datePipe.transform(dat4, 'dd/MM/yyyy'),
              fontSize: 13,
              bold: true,
            },
          ], margin: [0, 20]
        },
        this.getTable(this._sci2),

      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],

        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          fillColor: '#d0eeff',
          fontFamily: 'Roboto',
          alignement: 'left',
          color: '#0b5885',
        },
        td: {
          bold: false,
          fontSize: 10,
          fillColor: '#fff',
          fontFamily: 'Roboto',
          alignement: 'left',
          color: '#000',
        },
        tv: {
          bold: false,
          fontSize: 10,
          fillColor: '#fff',
          fontFamily: 'Roboto',
          alignement: 'left',
          color: '#3ac47d',
        },
        tr: {
          bold: false,
          fontSize: 10,
          fillColor: '#fff',
          fontFamily: 'Roboto',
          alignement: 'left',
          color: '#d92550',
        },
        tj: {
          bold: false,
          fontSize: 10,
          fillColor: '#fff',
          fontFamily: 'Roboto',
          alignement: 'left',
          color: '#f7b924',
        }
      },

    };
    this.pdfMake.createPdf(docDefinition).open();
  }
  chargements(){

    this.Swal.fire({
      html: '<div class="p-2 text-center">'+
     '<div class="font-icon-wrapper mr-3 mb-3" style="border: none;display: inline-block">'+
      '<div class="loader-wrapper d-flex justify-content-center align-items-center" style="vertical-align: middle;">'+
      '<div class="loader">'+
      '<div class="line-spin-fade-loader">'+
      '<div></div>'+
      '<div></div>'+
      '<div></div>'+
      '<div></div>'+
      '<div></div>'+
      '<div></div>'+
      '<div></div>'+
      '<div></div>'+
      '</div>'+
      '</div>'+
      '</div>'+
      '<p style="vertical-align: middle">Exportation du rapport...</p>'+
      '</div>'+
      '</div>',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: true,
    })
  }
  fp(){
    const dat1 = this.datS3;
    const dat2 = this.datS4;
    const dat3 = this.datS1;
    const dat4 = this.datS2;
    return [
      { text: 'RAPPORT DE MAINTENANCE', fontSize: 16, bold: true, alignment: 'center', decoration: 'underline', decorationStyle: 'double', margin: [0, 0, 0, 20] },
      { text:
          [
            {text:'Le présent document fait état de la situation de l\'entreprise entre les périodes allant du ', fontSize: 12},
            {text:this.datePipe.transform(dat1, 'dd/MM/yyyy') +' au '+ this.datePipe.transform(dat2, 'dd/MM/yyyy'), fontSize: 12, bold: true},
            {text:' vs ', fontSize: 12, bold: false, color: '#777777'},
            {text:this.datePipe.transform(dat3, 'dd/MM/yyyy') +' au '+ this.datePipe.transform(dat4, 'dd/MM/yyyy'), fontSize: 12, bold: true}
          ]
      },
      { text: 'Légende', fontSize: 13, italics: true, bold: true, alignment: 'left', decoration: 'underline', margin: [0, 10] },
      { text:
          [
            {text:'N°1: ', fontSize: 12, color: '#00ace6', bold: true, alignment: 'left',},
            {text:'nombre de pannes de la période comprise entre '+this.datePipe.transform(dat1, 'dd/MM/yyyy') +' et '+ this.datePipe.transform(dat2, 'dd/MM/yyyy'), fontSize: 12, }
          ],
      },
      { text:
          [
            {text:'N°2: ', fontSize: 12, color: '#00ace6', bold: true, alignment: 'left',},
            {text:'nombre de pannes de la période comprise entre '+this.datePipe.transform(dat3, 'dd/MM/yyyy') +' et '+ this.datePipe.transform(dat4, 'dd/MM/yyyy'), fontSize: 12, }
          ],
      },
      { text:
          [
            {text:'%N°: ', fontSize: 12, color: '#00ace6', bold: true, alignment: 'left',},
            {text:'taux d\'évolution (en %) des pannes entre les deux périodes ', fontSize: 12, }
          ],
      },

      { text: 'Rapport Alpicam Industries', fontSize: 13, italics: true, bold: true, alignment: 'left', decoration: 'underline', margin: [0, 20] },
      this.getTable(this.ridotto),
      {
        text: 'tableau 2',
        pageBreak: 'before',
        pageOrientation: 'landscape',
      },
    ]
  }

  getTable(rap: any[]){
    return {
      style: 'tableExample',
      table: {
        headerRows: 1,
        widths: [100, '*', '*', '*', '*', '*', '*', '*', '*', '*'],
        body: [
          [{ text: 'Section', style: 'tableHeader' }, { text: 'N°1', style: 'tableHeader' }, { text: 'N°2', style: 'tableHeader' }, { text: '%N°', style: 'tableHeader' }, { text: 'TDT1', style: 'tableHeader' }, { text: 'TDT2', style: 'tableHeader' }, { text: '%TDT', style: 'tableHeader' }, { text: 'MDT1', style: 'tableHeader' }, { text: 'MDT2', style: 'tableHeader' }, { text: '%MDT', style: 'tableHeader' }],

            ...rap.map(stat => {
            return [{text: stat.dep, style: 'td'},
              {text: stat.nbre2, style: 'td'}, {text: stat.nbre1, style: 'td'}, {text: stat.taux == 0 ? stat.taux+' %':
                (stat.taux == 100) ? stat.taux+' %':
                    (stat.taux == -100) ? (stat.taux) * (-1)+' %':
                        (stat.taux < 0 ) ? (stat.taux.toFixed(2)) * (-1)+' %':
                            stat.taux.toFixed(2)+' %', style: stat.taux < 0 ? 'tv' : stat.taux > 0 ? 'tr' : 'tj'},

              {text: stat.TDT2, style: 'td'}, {text: stat.TDT1, style: 'td'}, {text: stat.taux_TDT == 0 ? stat.taux_TDT+' %':
                  (stat.taux_TDT == 100) ? stat.taux_TDT+' %':
                      (stat.taux_TDT == -100) ? (stat.taux_TDT) * (-1)+' %':
                          (stat.taux_TDT < 0 ) ? (stat.taux_TDT.toFixed(2)) * (-1)+' %':
                              stat.taux_TDT.toFixed(2)+' %', style: stat.taux_TDT < 0 ? 'tv' : stat.taux_TDT > 0 ? 'tr' : 'tj'},

              {text: stat.MDT2 == 0 ? stat.MDT2 : stat.MDT2.toFixed(2), style: 'td'}, {text: stat.MDT1 == 0 ? stat.MDT1 : stat.MDT1.toFixed(2), style: 'td'}, {text: stat.taux_MDT == 0 ? stat.taux_MDT+' %':
                  (stat.taux_MDT == 100) ? stat.taux_MDT+' %':
                      (stat.taux_MDT == -100) ? (stat.taux_MDT) * (-1)+' %':
                          (stat.taux_MDT < 0 ) ? (stat.taux_MDT.toFixed(2)) * (-1)+' %':
                              stat.taux_MDT.toFixed(2)+' %', style: stat.taux_MDT < 0 ? 'tv' : stat.taux_MDT > 0 ? 'tr' : 'tj'}]
          }),
          // [{text: 'Alpicam', style: 'td'}, {text: '1008', style: 'td'}, {text: '488', style: 'td'}, {text: '51.59%', style: 'td'}, {text: '69839', style: 'td'}, {text: '32781', style: 'td'}, {text: '53.06%', style: 'td'}, {text: '69.28', style: 'td'}, {text: '67.17', style: 'td'}, {text: '3.05%', style: 'td'}],
          // [{text: 'Brazil', style: 'td'}, {text: '1008', style: 'td'}, {text: '488', style: 'td'}, {text: '51.59%', style: 'tr'}, {text: '69839', style: 'td'}, {text: '32781', style: 'td'}, {text: '53.06%', style: 'td'}, {text: '69.28', style: 'td'}, {text: '67.17', style: 'td'}, {text: '3.05%', style: 'td'}],
          // [{text: 'Contreplaqué', style: 'td'}, {text: '1008', style: 'td'}, {text: '4881w', style: 'td'}, {text: '51.59%', style: 'td'}, {text: '69839', style: 'td'}, {text: '32781', style: 'td'}, {text: '53.06%', style: 'td'}, {text: '69.28', style: 'td'}, {text: '67.17', style: 'td'}, {text: '3.05%', style: 'td'}],
          // [{text: 'Placage', style: 'td'}, {text: '1008', style: 'td'}, {text: '488', style: 'td'}, {text: '51.59%', style: 'td'}, {text: '69839', style: 'td'}, {text: '32781', style: 'td'}, {text: '53.06%', style: 'td'}, {text: '69.28', style: 'td'}, {text: '67.17', style: 'td'}, {text: '3.05%', style: 'td'}],
          // [{text: 'Scierie', style: 'td'}, {text: '1008', style: 'td'}, {text: '488', style: 'td'}, {text: '51.59%', style: 'tv'}, {text: '69839', style: 'td'}, {text: '32781', style: 'td'}, {text: '53.06%', style: 'td'}, {text: '69.28', style: 'td'}, {text: '67.17', style: 'td'}, {text: '3.05%', style: 'td'}],
        ]
      },
      layout: 'lightHorizontalLines'
    };
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }

  normal(){
    this.alpicamRapport();
    this.placageRapport();
    this.brazilRapport();
    this.contreplaqueRapport();
    this.scierieRapport();
    setTimeout(() =>{
      html2canvas(document.getElementById("rapPDF")).then(canvas =>{
      canvas.getContext('2d');
      var HTML_Width = canvas.width;
      var HTML_Height = canvas.height;
      var top_left_margin = 5;
      var PDF_Width = HTML_Width + (top_left_margin*2);
      var PDF_Height = (PDF_Width*1.5) + (top_left_margin*2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
      console.log(canvas.height+" "+canvas.width);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);

      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

      for(var i = 1; i <= totalPDFPages; i++){
        pdf.addPage(PDF_Width, PDF_Height);
        let margin = -(PDF_Height*i) + (top_left_margin*4);
        if(i > 1){
          margin = margin + i*8;
        }
        console.log(top_left_margin);
        console.log(-(PDF_Height*i) + (top_left_margin*4));
        pdf.addImage(imgData, 'JPG', top_left_margin, margin, canvas_image_width, canvas_image_height);
      }
      pdf.save("alpi");
    });
    }, 3000)

  }

  normals(){
    this.alpicamRapport();
    this.placageRapport();
    this.brazilRapport();
    this.contreplaqueRapport();
    this.scierieRapport();
    setTimeout(() =>{
      html2canvas(document.getElementById("rapPDF")).then(canvas =>{
      canvas.getContext('2d');
      var HTML_Width = canvas.width;
      var HTML_Height = canvas.height;
      var top_left_margin = 5;
      var PDF_Width = HTML_Width + (top_left_margin*2);
      var PDF_Height = (PDF_Width*1.5) + (top_left_margin*2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
      console.log(canvas.height+" "+canvas.width);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);

      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

      for(var i = 1; i <= totalPDFPages; i++){
        pdf.addPage(PDF_Width, PDF_Height);
        let margin = -(PDF_Height*i) + (top_left_margin*4);
        if(i > 1){
          margin = margin + i*8;
        }
        console.log(top_left_margin);
        console.log(-(PDF_Height*i) + (top_left_margin*4));
        pdf.addImage(imgData, 'JPG', top_left_margin, margin, canvas_image_width, canvas_image_height);
      }
      pdf.save("alpi");
    });
    }, 3000)

  }
  filts(){
    this.alpicamRangeRapport();
    this.placageRangeRapport();
    this.brazilRangeRapport();
    this.contreplaqueRangeRapport();
    this.scierieRangeRapport();
    setTimeout(() =>{
      html2canvas(document.querySelector(".rapPDF")).then(canvas =>{
      canvas.getContext('2d');
      var HTML_Width = canvas.width;
      var HTML_Height = canvas.height;
      var top_left_margin = 5;
      var PDF_Width = HTML_Width + (top_left_margin*2);
      var PDF_Height = (PDF_Width*1.5) + (top_left_margin*2);
      var canvas_image_width = HTML_Width;
      var canvas_image_height = HTML_Height;

      var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
      console.log(canvas.height+" "+canvas.width);

      var imgData = canvas.toDataURL("image/jpeg", 1.0);

      var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
      pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);

      for(var i = 1; i <= totalPDFPages; i++){
        pdf.addPage(PDF_Width, PDF_Height);
        let margin = -(PDF_Height*i) + (top_left_margin*4);
        if(i > 1){
          margin = margin + i*8;
        }
        console.log(top_left_margin);
        console.log(-(PDF_Height*i) + (top_left_margin*4));
        pdf.addImage(imgData, 'JPG', top_left_margin, margin, canvas_image_width, canvas_image_height);
      }
      pdf.save("alpiRange");
    });
    }, 3000)

  }

  alpicam(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getRidotto().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Alpicam"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  alpicamRapport(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.rapportService.getRidottos().subscribe(
        data => {
          this.sec_alpi = data;
          this.placageRapport();
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  placage(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getPlacage().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Placage";
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  placageRapport(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.rapportService.getPlacages().subscribe(
        data => {
          this.sec_pla = data;
          this.brazilRapport();
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  brazil(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getBrazil().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Brazil"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  brazilRapport(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.rapportService.getBrazils().subscribe(
        data => {
          this.sec_bra = data;
          this.contreplaqueRapport();
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  contreplaque(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getContreplaque().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Contreplaqué"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  contreplaqueRapport(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.rapportService.getContreplaques().subscribe(
        data => {
          this.sec_cp = data;
          this.scierieRapport();
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  scierie(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getScierie().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Scierie"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  scierieRapport(){
    const dat = new Date();
    const datm = new Date();
    var today = new Date().setFullYear(dat.getFullYear(),0,1);
    var tomorrow = new Date().setFullYear(dat.getFullYear()-1, 0, 1);
    // tomorrow.setFullYear(today.getFullYear()-1);
    this.datS1 = today;
    this.datS2 = datm;
    this.datS3 = tomorrow;
    this.datS4 = dat.setFullYear(dat.getFullYear()-1);
    this.rapportService.getScieries().subscribe(
        data => {
          this.sec_sci = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  alpicamRange(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getRidottoRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Alpicam"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  alpicamRangeRapport(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.rapportService.getRidottoRanges(d1, d2, d3, d4).subscribe(
        data => {
          this.sec_alpi = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  placageRange(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getPlacageRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Placage"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  placageRangeRapport(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.rapportService.getPlacageRanges(d1, d2, d3, d4).subscribe(
        data => {
          this.sec_pla = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  brazilRange(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getBrazilRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Brazil"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  brazilRangeRapport(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.rapportService.getBrazilRanges(d1, d2, d3, d4).subscribe(
        data => {
          this.sec_bra = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  contreplaqueRange(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getContreplaqueRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Contreplaqué"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  contreplaqueRangeRapport(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.rapportService.getContreplaqueRanges(d1, d2, d3, d4).subscribe(
        data => {
          this.sec_cp = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  scierieRange(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.loaderrapport = true;
    this.ridotto = [];
    this.rapportService.getScierieRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Scierie"
          this.loaderrapport = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrapport = false;
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
        }
    );
  }

  scierieRangeRapport(){
    const d1 = this.rapportRangeForm.controls['date1'].value;
    const d2 = this.rapportRangeForm.controls['date2'].value;
    const d3 = this.rapportRangeForm.controls['date3'].value;
    const d4 = this.rapportRangeForm.controls['date4'].value;

    this.datS3 = d1;
    this.datS4 = d2;
    this.datS1 = d3;
    this.datS2 = d4;
    this.rapportService.getScierieRanges(d1, d2, d3, d4).subscribe(
        data => {
          this.sec_sci = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
        }
    );
  }

  paretoAlpiRange(){
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-0',
      type: 'line'
    };
    const datasetNbrePanne4 = {
      data: [],
      label: "Total Down Time",
      yAxisID: 'y-axis-1',
      type: 'bar'
    };
    this.datas.labels = [];
    this.datas.datasets = [];
    const d1 = this.rangeForm.controls['date1'].value;
    const d2 = this.rangeForm.controls['date2'].value;
    this.loaderPareto = true;
    this.alpicamService.paretoAlpiRange(d1, d2).subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.datas.labels.push(mach.nom.toUpperCase());
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } ),
        error => {
          console.log('une erreur a été détectée!')
          this.loaderPareto = false;
        },
        () => {
          console.log('months');
          this.loaderPareto = false;
        }
    ) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
  }

  mtbfAlpicam(){
    const mtbf = {
      data: [],
      label: "MTBF",
      yAxisID: 'y-axis-0',
      type: 'bar',
    };
    const teste = {
      data: [],
      type: 'line',
      name: 'Nombre de Pannes'
    };
    const teste1 = {
      data: [],
      type: 'column',
      name: 'TDT'
    };
    const teste2 = {
      data: [],
      type: 'column',
      name: 'MTBF'
    };
    const test1 = {
      categories: []
    };
    const tdt = {
      data: [],
      label: "TDT",
      yAxisID: 'y-axis-1',
      type: 'bar',
    };

    const panne = {
      data: [],
      label: "Pannes",
      yAxisID: 'y-axis-1',
      type: 'line',
    };

    const wt = {
      data: [],
      label: "WT",
      yAxisID: 'y-axis-0',
      type: 'bar',
      order: 1,
      stacked: true
    };
    const ttr = {
      data: [],
      label: "TTR",
      yAxisID: 'y-axis-0',
      type: 'bar',
      order: 1,
      stacked: true
    };

    const mdt = {
      data: [],
      label: "MDT",
      yAxisID: 'y-axis-1',
      type: 'line',
      order: 2,
    };

    this.loader = true;
    this.dashboardService.mtbfByYearAlpi().subscribe(
        data1 => {
          this.mtbfY = data1;
          this.dashboardService.mtbfThisYearAlpi().subscribe(
              data2 => {
                this.mtbfTY = data2;
                this.mtbf = this.mtbfY.concat(this.mtbfTY);
                // this.mtbf = this.mtbfY.slice((this.mtbfY.length - 6), this.mtbfY.length).concat(this.mtbfTY);
                console.log('concat '+this.mtbf)

                for (let mach of this.mtbf){
                  this.mtbfByYear.labels.push(mach.date);
                  this.mdtByYear.labels.push(mach.date);
                  test1.categories.push(mach.date);

                    var y = mach.TDT/60;
                    var z = mach.HT - y;


                    var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                    var mt = z / a;
                    mtbf.data.push(Math.trunc(mt));
                    teste2.data.push(Math.trunc(mt));




                  // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                  panne.data.push(mach.nbre);
                  tdt.data.push(mach.TDT);
                  teste.data.push(mach.nbre);
                  teste1.data.push(mach.TDT);
                  // teste2.data.push(mtbf);

                  wt.data.push(Math.trunc(mach.WT/mach.nbre));
                  ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                  mdt.data.push(Math.trunc(mach.TDT/mach.nbre));

                }
                console.log('testons voir :' + JSON.stringify(test1));
                // this.labs = test1;
                // console.log('dépassé: '+this.labs.valueOf())
              },
              error => {
                console.log('une erreur a été détectée!')
                // this.loader = false;
              },
              () => {
                console.log('years');
                this.loader = false;
              }
          );
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('months');
          console.log(this.pm);
        }
    ) ;


    this.mtbfByYear.datasets.push(mtbf);
    this.mtbfByYear.datasets.push(tdt);
    this.mtbfByYear.datasets.push(panne);
    // this.test.datasets.push(teste2);
    // this.test.datasets.push(teste1);
    // this.test.datasets.push(teste);

    this.mdtByYear.datasets.push(wt);
    this.mdtByYear.datasets.push(ttr);
    this.mdtByYear.datasets.push(mdt);
    // this.labs.categories.push(this.mtbfByYear.labels);
    // this.labs.categories.push(test1.categories)

  }

  // mtbfAlpicam(){
  //   const mtbf = {
  //     data: [],
  //     label: "MTBF",
  //     yAxisID: 'y-axis-0',
  //     type: 'bar',
  //   };
  //   const teste = {
  //     data: [],
  //     type: 'line',
  //     name: 'Nombre de Pannes'
  //   };
  //   const teste1 = {
  //     data: [],
  //     type: 'column',
  //     name: 'TDT'
  //   };
  //   const teste2 = {
  //     data: [],
  //     type: 'column',
  //     name: 'MTBF'
  //   };
  //   const test1 = {
  //     categories: []
  //   };
  //   const tdt = {
  //     data: [],
  //     label: "TDT",
  //     yAxisID: 'y-axis-1',
  //     type: 'bar',
  //   };
  //
  //   const panne = {
  //     data: [],
  //     label: "Pannes",
  //     yAxisID: 'y-axis-1',
  //     type: 'line',
  //   };
  //
  //   const wt = {
  //     data: [],
  //     label: "WT",
  //     yAxisID: 'y-axis-0',
  //     type: 'bar',
  //     order: 1,
  //     stacked: true
  //   };
  //   const ttr = {
  //     data: [],
  //     label: "TTR",
  //     yAxisID: 'y-axis-0',
  //     type: 'bar',
  //     order: 1,
  //     stacked: true
  //   };
  //
  //   const mdt = {
  //     data: [],
  //     label: "MDT",
  //     yAxisID: 'y-axis-1',
  //     type: 'line',
  //     order: 2,
  //   };
  //
  //   this.dashboardService.mtbfAlpi().subscribe(
  //       data1 => {
  //         this.mtbf = data1;
  //
  //               for (let mach of this.mtbf){
  //                 this.mtbfByYear.labels.push(mach.date);
  //                 this.mdtByYear.labels.push(mach.date);
  //                 test1.categories.push(mach.date);
  //
  //                   var y = mach.TDT/60;
  //                   var z = mach.HT - y;
  //
  //
  //                   var a = Number.parseInt(mach.nbre.toString()) + 1 ;
  //
  //
  //                   var mt = z / a;
  //                   mtbf.data.push(Math.trunc(mt));
  //                   teste2.data.push(Math.trunc(mt));
  //
  //
  //
  //
  //                 // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
  //                 panne.data.push(mach.nbre);
  //                 tdt.data.push(mach.TDT);
  //                 teste.data.push(mach.nbre);
  //                 teste1.data.push(mach.TDT);
  //                 // teste2.data.push(mtbf);
  //
  //                 wt.data.push(Math.trunc(mach.WT/mach.nbre));
  //                 ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
  //                 mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
  //
  //               }
  //               console.log('testons voir :' + JSON.stringify(test1));
  //               // this.labs = test1;
  //               // console.log('dépassé: '+this.labs.valueOf())
  //
  //       },
  //       error => {
  //         console.log('une erreur a été détectée!')
  //       },
  //       () => {
  //         console.log('months');
  //         console.log(this.pm);
  //       }
  //   ) ;
  //
  //
  //   this.mtbfByYear.datasets.push(mtbf);
  //   this.mtbfByYear.datasets.push(tdt);
  //   this.mtbfByYear.datasets.push(panne);
  //   // this.test.datasets.push(teste2);
  //   // this.test.datasets.push(teste1);
  //   // this.test.datasets.push(teste);
  //
  //   this.mdtByYear.datasets.push(wt);
  //   this.mdtByYear.datasets.push(ttr);
  //   this.mdtByYear.datasets.push(mdt);
  //   // this.labs.categories.push(this.mtbfByYear.labels);
  //   // this.labs.categories.push(test1.categories)
  //
  // }

  paretoAlpiThisMonth(){
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-0',
      type: 'line'
    };
    const datasetNbrePanne4 = {
      data: [],
      label: "Total Down Time",
      yAxisID: 'y-axis-1',
      type: 'bar'
    };
    this.datas.labels = [];
    this.datas.datasets = [];
    this.loaderPareto = true;
    this.alpicamService.paretoAlpiThisMonth().subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.datas.labels.push(mach.nom.toUpperCase());
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } ),
        error => {
          console.log('une erreur a été détectée!')
          this.loaderPareto = false;
        },
        () => {
          console.log('months');
          this.loaderPareto = false;
        }
    ) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
  }

  paretoAlpiLastMonth(){
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-0',
      type: 'line'
    };
    const datasetNbrePanne4 = {
      data: [],
      label: "Total Down Time",
      yAxisID: 'y-axis-1',
      type: 'bar'
    };
    this.datas.labels = [];
    this.datas.datasets = [];
    this.loaderPareto = true;
    this.alpicamService.paretoAlpiLastMonth().subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.datas.labels.push(mach.nom.toUpperCase());
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } ),
        error => {
          console.log('une erreur a été détectée!')
          this.loaderPareto = false;
        },
        () => {
          console.log('months');
          this.loaderPareto = false;
        }
    ) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
  }

  statsPanne(){
    const tdt = {
      data: [],
      label: "TDT",
      // yAxisID: 'y-axis-0',
      type: 'bar',
        // stack: 'a'
    };

    const panne = {
      data: [],
      label: "Pannes",
      // yAxisID: 'y-axis-0',
      type: 'bar',
        // stack: 'a'
    };

    const wt = {
      data: [],
      label: "MWT",
      // yAxisID: 'y-axis-0',
      type: 'bar',
        // stack: 'a'
    };
    const ttr = {
      data: [],
      label: "MTTR",
      // yAxisID: 'y-axis-0',
      type: 'bar',
        // stack: 'a'
    };

    const mdt = {
      data: [],
      label: "MDT",
      // yAxisID: 'y-axis-0',
      type: 'bar',
        // stack: 'a'
    };
    this.loaderrecap = true;
    this.alpicamService.getRecapPanne().subscribe(
        list => {
          this.stats = list;
          for(let mach of list){
            this.graph.labels.push(mach.date);
            panne.data.push(this.decimal(mach.taux) == false ? mach.taux.toFixed(2) : mach.taux);
            tdt.data.push(this.decimal(mach.taux_TDT) == false ? mach.taux_TDT.toFixed(2) : mach.taux_TDT);
            wt.data.push(this.decimal(mach.taux_WT) == false ? mach.taux_WT.toFixed(2) : mach.taux_WT);
            ttr.data.push(this.decimal(mach.taux_TTR) == false ? mach.taux_TTR.toFixed(2) : mach.taux_TTR);
            mdt.data.push(this.decimal(mach.taux_MDT) == false ? mach.taux_MDT.toFixed(2) : mach.taux_MDT);
          }
          this.loaderrecap = false;
        },
        error => {
          console.log('une erreur a été détectée!')
          this.loaderrecap = false;
        },
        () => {
          console.log('months');
          this.loaderrecap = false;
        }
    );
    this.graph.datasets.push(panne);
    this.graph.datasets.push(tdt);
    this.graph.datasets.push(wt);
    this.graph.datasets.push(ttr);
    this.graph.datasets.push(mdt);
  }

  typePanneThisMonth(){
    this.catP.labels = [];
    this.dta = [];
    this.loadertype = true;
    this.alpicamService.getTypePanneThisMonth().subscribe(
        list => list.forEach(mach => {
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.dta.push(mach.nbre);
        } )
    ,
        error => {
          console.log('une erreur a été détectée!')
          this.loadertype = false;
        },
        () => {
          console.log('months');
          this.loadertype = false;
        }
    ) ;

  }

  typePanneLastMonth(){
    this.catP.labels = [];
    this.dta = [];
    this.loadertype = true;
    this.alpicamService.getTypePanneLastMonth().subscribe(
        list => list.forEach(mach => {
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.dta.push(mach.nbre);
        } )
    ,
        error => {
          console.log('une erreur a été détectée!')
          this.loadertype = false;
        },
        () => {
          console.log('months');
          this.loadertype = false;
        }
    ) ;

  }

  typePanneRange(){
    this.catP.labels = [];
    this.dta = [];
    const d1 = this.rangeForm.controls['date1'].value;
    const d2 = this.rangeForm.controls['date2'].value;
    this.date_this_months = d1 +' au '+ d2;
    this.loadertype = true;
    this.alpicamService.getTypePanneRange(d1, d2).subscribe(
        list => list.forEach(mach => {
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.dta.push(mach.nbre);
        } )
    ,
        error => {
          console.log('une erreur a été détectée!')
          this.loadertype = false;
        },
        () => {
          console.log('months');
          this.loadertype = false;
        }
    ) ;

  }

  loadDepartements() {
    this.departementService.getDepartements().subscribe(
        data => {
          this.departements = data
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des départements');
          console.log(this.departements)
        }
    );
  }


  showDepart(d: Departement){
    let url = btoa(d.idDepartement.toString());
    console.log(d.idDepartement +' '+url);
    this.router.navigateByUrl("departements/"+url);
  }

  suiviJournalier($event){
    if (this.dashPanForm.controls['dashPeriode'].value == 'tmp'){
      const dat = new Date();
      this.date_this_months = this.datePipe.transform(dat, 'MMMM yyyy');
      this.paretoAlpiThisMonth();
      this.typePanneThisMonth();
    }
    if (this.dashPanForm.controls['dashPeriode'].value == 'lmp'){
      const dat = new Date();
      const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMMM yyyy');
      console.log('last Month: '+ dat1);
      this.date_this_months = dat1;
      this.paretoAlpiLastMonth();
      this.typePanneLastMonth();
    }
    if (this.dashPanForm.controls['dashPeriode'].value == 'pp'){
      this.ranges = "true";
    }
    else {
      this.ranges = "false";
    }
  }

  decimal(x: number){
    if (Number.isInteger(x)) {
      return true;
    }
    return false;
  }

  paginate($event){
    if (this.pageForm.controls['page'].value == 'A'){
      this.filt == false ? this.alpicam() : this.alpicamRange();
    }
    if (this.pageForm.controls['page'].value == 'P'){
      this.filt == false ? this.placage() : this.placageRange();
    }
    if (this.pageForm.controls['page'].value == 'B'){
      this.filt == false ? this.brazil() : this.brazilRange();
    }
    if (this.pageForm.controls['page'].value == 'C'){
      this.filt == false ? this.contreplaque() : this.contreplaqueRange();
    }
    if (this.pageForm.controls['page'].value == 'S'){
      this.filt == false ? this.scierie() : this.scierieRange();
    }
  }
}
