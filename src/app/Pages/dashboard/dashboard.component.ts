import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Pannes} from "../../Models/pannes";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PannesService} from "../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {BaseChartDirective, Color, Label} from "ng2-charts";
// import {ChartDataSets, ChartOptions} from "chart.js";
import {DatePipe} from "@angular/common";
import {Arrets} from "../../Models/arrets";
import {ArretsService} from "../../services/arrets/arrets.service";
import {Departement} from "../../Models/departement";
import {Router} from "@angular/router";
import {Machine} from "../../Models/machines";
import {DepartementsService} from "../../services/departements/departements.service";
// import {AgGridAngular, AgGridModule} from "ag-grid-angular"
// import { AllCommunityModules } from 'ag-grid-community/dist/ag-grid-community';
import {
    ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ChartComponent
} from "ng-apexcharts";
import {UserService} from "../../services/user/user.service";
import * as jsPDF from 'jspdf';
import  * as html2canvas from "html2canvas";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    stroke: ApexStroke;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    // @ViewChild("chart", { static: true }) chart: ChartComponent;
    public chartOptions: Partial<any>;
    ranger: string = "false";
    ranges: string = "false";
    pages: number = 7;
    board: string;
    errorMessage: string;
    series = [];

  headings = 'Tableau de Bord';
  subheadings = 'Consultez l\'actualité des évènements ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  searchPanForm: FormGroup;
  dashPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  rangeForm: FormGroup;
  pannes: Pannes[];
  // ThisWeekPannes: Pannes[];
  countPannes: number;
  cpannes: any[] = [];
  StatsTec: any[];
  Tpannes: Pannes[];
  Hpannes: Pannes[];
  departement: Departement[];
  py: Pannes[];
  pm: Pannes[];
  pt: Pannes[];
  nbreThisYear: Pannes[];
  nbreLastMonth: Pannes[];
  lastMonth: number;
  mtbfY: Pannes[];
  mtbfTY: Pannes[];
  mtbf: Pannes[];
  arrets: Arrets[];
  cdpannes: Pannes[];
  Opannes: Pannes[];
  Detailspannes: Pannes[];
  Outilpannes: Pannes[];
  times: Pannes[];
  selectedPanne: Pannes;
  selectedArret: Arrets;
  tail: number;
  tails: number;
  count: number;
  cdount: number;
  tount: number;
  closeResult: any;
  TDT: number = 0;
  t1: Pannes[];
  t2: Pannes[];
  t3: Pannes[];

  years: Pannes[];
  month: Pannes[];
  all: any[];

  dataPanne = {
    labels: [],
    datasets: []
  };

  datas = {
      labels: [],
      datasets: []
  };

  mdtByYear = {
      labels: [],
      datasets: []
  };

  mtbfByYear = {
      labels: [],
      datasets: []
  };

    test = {
        labs:  {
            type: "category",
            categories: []
        },
        datasets: []
    };

    tests = {
        categories: []
    };


  type: string = "bar";


    public datasets = [
        {
            label: '',
            data: [1,2],
            datalabels: {
                display: false,
            },

        }
    ];


    public colors: Color[] = [
        { // grey
            backgroundColor: 'rgba(247, 185, 36, 0.2)',
            borderColor: '#f7b924',
            borderCapStyle: 'round',
            borderDash: [],
            borderWidth: 1,
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: '#f7b924',
            pointBackgroundColor: '#fff',
            pointHoverBorderWidth: 4,
            pointRadius: 6,
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#f7b924',
        },
        { // dark grey
            backgroundColor: 'rgba(0, 227, 150,0.2   )',
            borderColor: 'rgba(0, 227, 150,1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0, 227, 150,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 227, 150,1)'
        },
        { // red
            backgroundColor: 'transparent',
            borderColor: '#fff',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,0.8)'
        }
    ]

    public options = {
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    beginAtZero: true
                },
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false
                }
            }]
        },
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false
    };


    public labs = {
        type: "category",
        categories: [],
    };
    contentDataURL: any;
    contentDataURL1: any;

    imgHeight: any
    imgHeight1: any
    private todatpannes: Pannes[];

  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private arretService: ArretsService,
              private dashboardService: DashboardService,
              private departementService: DepartementsService,
              private userService: UserService,
              private datePipe: DatePipe,
              private modalService: NgbModal, private router: Router  ) {


      this.createForm();
      this.createForms();
      this.dashForm();
      this.rangeForms();
      this.pageForms();


      this.dashboardService.getCountDepPannes().subscribe(

          data => {
              this.cdpannes = data;
              console.log('nbre : ' +this.cdpannes.length);
              console.log('nbre total: ');
              console.log(this.cdpannes);

              var x = 0;
              for (let pin of this.cdpannes){
                  x = x + pin.nbre;
              }

              this.series.push(x);

          },
          error => {
              console.log('une erreur a été détectée!')
          },
          () => {
              console.log('Total');
              // console.log(this.cdount);
          }
      );

      this.chartOptions = {
          chart: {
              height: 200,
              type: "radialBar",
          },

          series: [this.series],

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
          labels: ["Total Pannes"]
      };

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

    createForm() {
        this.searchPanForm = this.fb.group({
            search: [''],
        });
    }

    rangeForms() {
        this.rangeForm = this.fb.group({
            date1: [''],
            date2: ['']
        });
    }

    dashForm() {
        this.dashPanForm = this.fb.group({
            dashPeriode: [''],
        });
    }

  ngOnInit() {

      this.userService.getUserBoard().subscribe(
          data => {
              this.board = data;
          },
          error => {
              this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
          }
      );

    this.selectedPanne = new Pannes();
    this.selectedArret = new Arrets();
    this.TodayPannes();
    this.LoadArrets();
    this.loadDepartements();
    this.countAllPannes();
    this.countDepPannes();
    this.getChart();
    this.loadTimePannes();
    // this.getChart2();
    this.last30days();
    this.radialBar();
    this.countThisYear();
    // this.ThisWeekPanne();
    this.ThisWeekPannes();


    this.StatistiquesTechniciens();
  }

    loadDepartements() {
        this.departementService.getDepartements().subscribe(
            data => {
                this.departement = data
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des départements');
                console.log(this.departement)
            }
        );
    }

  LoadArrets(){

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

  countAllPannes(){

      this.cpannes = [];
        this.panneService.getCountThisPannes().subscribe(
            data => {
                this.cpannes = data;
                this.count = 0;
                for (let pin of data){
                    this.count = this.count + pin.nbre;
                }

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.count);
                console.log('machines totales');
                console.log(this.cpannes);
            }
        );
    }

  countAllLastMonthPannes(){
      this.cpannes = [];
        this.panneService.getCountLastPannes().subscribe(
            data => {
                this.cpannes = data;
                this.count = 0;
                for (let pin of data){
                    this.count = this.count + pin.nbre;
                }

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.count);
                console.log('machines totales');
                console.log(this.cpannes);
            }
        );
    }

  countAllRangePannes(){
      this.cpannes = [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.panneService.getCountRangePannes(d1, d2).subscribe(
            data => {
                this.cpannes = data;
                this.count = 0;
                for (let pin of data){
                    this.count = this.count + pin.nbre;
                }

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.count);
                console.log('machines totales');
                console.log(this.cpannes);
            }
      );
  }

  StatistiquesTechniciens(){

        this.dashboardService.statsTechniciensByMonth().subscribe(
            data => {
                this.StatsTec = data;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.StatsTec);
            }
        );
    }

  StatistiquesTechniciensLastMonth(){

        this.dashboardService.statsTechniciensLastMonth().subscribe(
            data => {
                this.StatsTec = data;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.StatsTec);
            }
        );
    }

  StatistiquesTechniciensRange(){
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.dashboardService.statsTechniciensRange(d1, d2).subscribe(
            data => {
                this.StatsTec = data;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.StatsTec);
            }
        );
    }

  countDepPannes(){
      this.cdount = 0;
      this.tount= 0;
        this.dashboardService.getCountDepPannes().subscribe(

            data => {
                this.cdpannes = data;

                for (let pin of this.cdpannes){
                    this.cdount = this.cdount + pin.nbre;
                }

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('Total');
                console.log(this.cdount);
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

    this.dashboardService.getCountPerDayPannes().subscribe(
        list => list.forEach(mach => {
          this.dataPanne.labels.push(mach.date);
          datasetNbrePanne.data.push(mach.nbre);
        } ) );

    this.dataPanne.datasets.push(datasetNbrePanne);


  }

  last30days(){
      this.datas.labels = [];
      this.datas.datasets = [];
    const datasetNbrePanne3 = {
        data: [],
        label: "Panne",
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
    this.dashboardService.getCountPerDayPannes().subscribe(
        list => list.forEach(mach => {
            // datasetNbrePanne2.name = (mach.machine);
            this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
            datasetNbrePanne3.data.push(mach.nbre);
            datasetNbrePanne4.data.push(mach.dt);

        } )) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
    }

    dashLastMonth(){
      this.datas.labels = [];
      this.datas.datasets = [];
    const datasetNbrePanne3 = {
        data: [],
        label: "Panne",
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
    this.dashboardService.getCountDashLastPannes().subscribe(
        list => list.forEach(mach => {
            // datasetNbrePanne2.name = (mach.machine);
            this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
            datasetNbrePanne3.data.push(mach.nbre);
            datasetNbrePanne4.data.push(mach.dt);

        } )) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
    }

    dashThisMonth(){
        this.datas.labels = [];
        this.datas.datasets = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
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
        this.dashboardService.getCountDashThisPannes().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);

            } )) ;
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);
    }

    dashRange(){
        this.datas.labels = [];
        this.datas.datasets = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
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
        this.dashboardService.getCountRangePannes(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);

            } )) ;
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);
    }

    //modal
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


    radialBar(){


    this.dashboardService.getCountDepPannes().subscribe(

        data => {
            this.cdpannes = data;
            console.log('nbre : ' +this.cdpannes.length);
            console.log('nbre total: \n'+ this.cdpannes);

            var x = 0;
            for (let pin of this.cdpannes){
                x = x + pin.nbre;
            }

            // this.series.push(x);

            // var options = {
            // this.chartOptions = {
            //     chart: {
            //         height: 200,
            //         type: "radialBar",
            //     },
            //
            //     series: [x],
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
            //     labels: ["Total Pannes"]
            // };

            // var chart = new ApexCharts(document.querySelector("#chart"), options);
            //
            // chart.render();

        },
        error => {
            console.log('une erreur a été détectée!')
        },
        () => {
            console.log('Total');
            console.log(this.cdount);
        }
    );



    }


    countThisYear(){
    this.dashboardService.CountThisYear().subscribe(
        data => {
            this.nbreThisYear = data;
        }
    );

    this.dashboardService.CountPastMonth().subscribe(
        datas => {
            this.nbreLastMonth = datas;
            this.lastMonth = 0;
            for (let mach of this.nbreLastMonth){
                this.lastMonth = this.lastMonth + mach.nbre;
            }
        }
    )
}


    loadPannes(){

        this.panneService.getAllPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                for (let pin of data){
                    this.selectedPanne.numero = pin.numero;
                }
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des pannes');
                console.log(this.pannes);
            }
        );


    }

//     ThisWeekPanne(){
//
//     this.panneService.getThisWeekPannes().subscribe(
//         data => {
//             this.ThisWeekPannes = data;
//             this.countPannes = data.length;
//             // this.rowData = data;
//         },
//         error => {
//             console.log('une erreur a été détectée!')
//         },
//         () => {
//             console.log('panne cette semaine');
//             console.log(this.ThisWeekPannes);
//         }
//     );
// }

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

        this.panneService.getTodayPannes().subscribe(
            data => {
                this.pannes = data;
                this.todatpannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne aujourd\'hui');
                console.log(this.pannes);
            }
        );
    }

    HierPannes(){

        this.panneService.getHierPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne hier');
                console.log(this.pannes);
            }
        );
    }

    ThisWeekPannes(){

        this.panneService.getThisWeekPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne cette semaine');
                console.log(this.pannes);
            }
        );
    }

    LastWeekPannes(){

        this.panneService.getLastWeekPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne aujourd\'hui');
                console.log(this.pannes);
            }
        );
    }

    LastMonthPannes(){

        this.panneService.getLastMonthPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne aujourd\'hui');
                console.log(this.pannes);
            }
        );
    }

    ThisMonthPannes(){

        this.panneService.getThisMonthPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne aujourd\'hui');
                console.log(this.pannes);
            }
        );
    }

    LastYearPannes(){

        this.panneService.getLastYearPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne aujourd\'hui');
                console.log(this.pannes);
            }
        );
    }

    ThisYearPannes(){

        this.panneService.getThisYearPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
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

        this.panneService.getRangeDatePannes(d1, d2).subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne aujourd\'hui');
                console.log(this.pannes);
            }
        );
    }

    showDepart(d: Departement){
        let url = btoa(d.idDepartement.toString());
        console.log(d.idDepartement +' '+url);
        this.router.navigateByUrl("departements/"+url);
    }

    showMachine(m: Machine){
        let url = btoa(m.idM.toString());
        this.modalService.dismissAll();
        this.router.navigateByUrl("machines/"+url);
    }

    showMachines(m: Machine){
        let url = btoa(m.idMachine.toString());
        this.modalService.dismissAll();
        this.router.navigateByUrl("machines/"+url);
    }

    suiviJournalier($event){
        if (this.dashPanForm.controls['dashPeriode'].value == 'l30d'){
            this.last30days();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'tmp'){
            this.dashThisMonth();
            this.countAllPannes()
            this.StatistiquesTechniciens();
            this.ThisMonthPannes();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'lmp'){
            this.dashLastMonth();
            this.countAllLastMonthPannes();
            this.StatistiquesTechniciensLastMonth();
            this.LastMonthPannes();
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
            this.HierPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'ttesp'){
            this.loadPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'tp'){
            this.TodayPannes();
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
            this.ranges = "true";
        }
        else {
            this.ranges = "false";
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
