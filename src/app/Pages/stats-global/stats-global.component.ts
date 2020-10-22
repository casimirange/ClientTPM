import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Pannes} from "../../Models/pannes";
import {DatePipe} from "@angular/common";
import {Color} from "ng2-charts";
import {ApexXAxis, NgApexchartsModule} from "ng-apexcharts";
import {AlpicamService} from "../../services/alpicam/alpicam.service";
import {DepartementsService} from "../../services/departements/departements.service";
import {Departement} from "../../Models/departement";
// import {ApexOptions} from 'apexcharts'
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RapportService} from "../../services/rapport/rapport.service";


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
  stats: any[];

  mdtByYear = {
    labels: [],
    datasets: []
  };

  mtbfByYear = {
    labels: [],
    datasets: []
  };

  datas = {
    labels: [],
    datasets: []
  };

  graph = {
    labels: [],
    datasets: []
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

  ridotto: any[];
  section: string = "Alpicam";

  series: any[];
  datS1: any;
  datS2: any;
  datS3: any;
  datS4: any;
  date_this_months: any;

  public rangeForm: FormGroup;
  public ranges: string = 'false';

  constructor(private dashboardService: DashboardService,
              private rapportService: RapportService,
              private datePipe: DatePipe,
              private router: Router,
              private fb: FormBuilder,
              private departementService: DepartementsService,
              private alpicamService: AlpicamService) {
    this.dashForm();
    this.rangeForms();
    this.rapportForms();
    this.pageForms();
    this.statsPanne();
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
      date1: [''],
      date2: ['']
    });
  }

  rapportForms() {
    this.rapportRangeForm = this.fb.group({
      date1: [''],
      date2: [''],
      date3: [''],
      date4: ['']
    });
  }

  ngOnInit() {
    this.mtbfAlpicam();
    this.paretoAlpiThisMonth();
    this.typePanneThisMonth();
    this.loadDepartements();

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


    this.alpicam();

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
    this.rapportService.getRidotto().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Alpicam"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
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
    this.rapportService.getPlacage().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Placage"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport placage');
          console.log(this.ridotto);
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
    this.rapportService.getBrazil().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Brazil"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport brazil');
          console.log(this.ridotto);
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
    this.rapportService.getContreplaque().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Contreplaqué"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport contreplaque');
          console.log(this.ridotto);
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
    this.rapportService.getScierie().subscribe(
        data => {
          this.ridotto = data;
          this.section = "Scierie"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport contreplaque');
          console.log(this.ridotto);
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
    this.rapportService.getRidottoRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Alpicam"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport');
          console.log(this.ridotto);
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
    this.rapportService.getPlacageRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Placage"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport placage');
          console.log(this.ridotto);
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
    this.rapportService.getBrazilRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Brazil"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport brazil');
          console.log(this.ridotto);
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
    this.rapportService.getContreplaqueRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Contreplaqué"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport contreplaque');
          console.log(this.ridotto);
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
    this.rapportService.getScierieRange(d1, d2, d3, d4).subscribe(
        data => {
          this.ridotto = data;
          this.section = "Scierie"
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('rapport contreplaque');
          console.log(this.ridotto);
        }
    );
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
  //   this.dashboardService.mtbfByYearAlpi().subscribe(
  //       data1 => {
  //         this.mtbfY = data1;
  //         this.dashboardService.mtbfThisYearAlpi().subscribe(
  //             data2 => {
  //               this.mtbfTY = data2;
  //               this.mtbf = this.mtbfY.slice((this.mtbfY.length - 6), this.mtbfY.length).concat(this.mtbfTY);
  //               console.log('concat '+this.mtbf)
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
  //             },
  //             error => {
  //               console.log('une erreur a été détectée!')
  //             },
  //             () => {
  //               console.log('years');
  //               console.log(this.py);
  //             }
  //         );
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

    this.rapportService.MTBF().subscribe(
        data1 => {
          this.mtbf = data1;

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
    this.alpicamService.paretoAlpiRange(d1, d2).subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.datas.labels.push(mach.nom.toUpperCase());
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } )) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
  }

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
    this.alpicamService.paretoAlpiThisMonth().subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.datas.labels.push(mach.nom.toUpperCase());
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } )) ;
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
    this.alpicamService.paretoAlpiLastMonth().subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.datas.labels.push(mach.nom.toUpperCase());
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } )) ;
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
    this.alpicamService.getTypePanneThisMonth().subscribe(
        list => list.forEach(mach => {
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.dta.push(mach.nbre);
        } )
    );

  }

  typePanneLastMonth(){
    this.catP.labels = [];
    this.dta = [];
    this.alpicamService.getTypePanneLastMonth().subscribe(
        list => list.forEach(mach => {
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.dta.push(mach.nbre);
        } )
    );

  }

  typePanneRange(){
    this.catP.labels = [];
    this.dta = [];
    const d1 = this.rangeForm.controls['date1'].value;
    const d2 = this.rangeForm.controls['date2'].value;
    this.date_this_months = d1 +' au '+ d2;
    this.alpicamService.getTypePanneRange(d1, d2).subscribe(
        list => list.forEach(mach => {
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.dta.push(mach.nbre);
        } )
    );

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
