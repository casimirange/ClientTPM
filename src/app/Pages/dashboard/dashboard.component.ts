import {Component, OnInit, ViewChild} from '@angular/core';
import {Pannes} from "../../Models/pannes";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PannesService} from "../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {BaseChartDirective, Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions} from "chart.js";
import {DatePipe} from "@angular/common";
import {Arrets} from "../../Models/arrets";
import {ArretsService} from "../../services/arrets/arrets.service";
import {Departement} from "../../Models/departement";
import {Router} from "@angular/router";
import {Machine} from "../../Models/machines";
import {DepartementsService} from "../../services/departements/departements.service";
// import {ApexOptions} from "apexcharts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  headings = 'Tableau de Bord';
  subheadings = 'Consultez l\'actualité des évènements ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  searchPanForm: FormGroup;
  pannes: Pannes[];
  ThisWeekPannes: Pannes[];
  cpannes: Pannes[];
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
  times: Pannes[];
  selectedPanne: Pannes;
  selectedArret: Arrets;
  tail: number;
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

    donutChartData = [
        {
            label: 'Liverpool FC',
            value: 5,
            color: 'rgba(255, 20, 178, 0.4)',
        },
        {
            label: 'FC Bayern München',
            value: 5,
            color: 'blue',
        },
    ];

  // view: any[] = [600, 400];
  view: any[] ;
  // options pour le graphique
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  YAxisLabel = 'N° Pannes';
  showYAxisLabel = true;
  XAxisLabel = 'Machines';
  timeline = true;

  //pie
  showLabels = true;
  type: string = "bar";

  //data
  public single = [{

      name: "China",
      value: 124

      // {
      //     name: "hum",
      //     value: 74,
      // },
  }];

    slideConfig6 = {
        className: 'center',
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        adaptiveHeight: true,
        dots: true,
    };

    public datasets = [
        {
            label: '',
            data: [1,2],
            datalabels: {
                display: false,
            },

        }
    ];

    public datasets2 = [
        {
            label: 'My First dataset',
            data: [46, 55, 59, 80, 81, 38, 65, 59, 80],
            datalabels: {
                display: false,
            },

        }
    ];

    public datasets3 = [
        {
            label: 'My First dataset',
            data: [65, 59, 80, 81, 55, 38, 59, 80, 46],
            datalabels: {
                display: false,
            },

        }
    ];
    public lineChartColors: Color[] = [
        { // dark grey
            backgroundColor: 'rgba(247, 185, 36, 0.2)',
            borderColor: '#f7b924',
            borderCapStyle: 'round',
            borderDash: [],
            borderWidth: 4,
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

    public lineChartColors2: Color[] = [
        { // dark grey
            backgroundColor: 'rgba(48, 177, 255, 0.2)',
            borderColor: '#30b1ff',
            borderCapStyle: 'round',
            borderDash: [],
            borderWidth: 4,
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: '#30b1ff',
            pointBackgroundColor: '#ffffff',
            pointHoverBorderWidth: 4,
            pointRadius: 6,
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            pointHoverBackgroundColor: '#ffffff',
            pointHoverBorderColor: '#30b1ff',
        },
    ];

    public lineChartColors3: Color[] = [
        { // dark grey
            backgroundColor: 'rgba(86, 196, 121, 0.2)',
            borderColor: '#56c479',
            borderCapStyle: 'round',
            borderDash: [],
            borderWidth: 4,
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: '#56c479',
            pointBackgroundColor: '#fff',
            pointHoverBorderWidth: 4,
            pointRadius: 6,
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#56c479',
        },
    ];

    public labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'];

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

    public chart= {
        height: 'auto',
        type: "",
        zoom: {
            enabled: false
        }
    }

    public labs = {
        type: "category",
        categories: [],
    };

  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private arretService: ArretsService,
              private dashboardService: DashboardService,
              private departementService: DepartementsService,
              private datePipe: DatePipe,
              private modalService: NgbModal, private router: Router  ) {
      const teste2 = {
          data: [],
          name: 'Nombre de Pannes'
      };
      this.dashboardService.mtbfByYearAlpi().subscribe(
          data1 => {
              this.t1 = data1;
              this.dashboardService.mtbfThisYearAlpi().subscribe(
                  data2 => {
                      this.t2 = data2;
                      this.t3 = this.t1.concat(this.t2);

                      // for (let mach of this.mtbf){
                      //
                      //     console.log(mach.date)
                      //
                      //     teste2.data.push(mach.HT);
                      // }

                      this.t3.forEach(list => {
                          // this.test.labs.categories.push(list.date);
                          teste2.data.push(list.nbre);
                          // this.labs.categories.push(list.date)
                      })
                  },
                  error => {
                      console.log('une erreur a été détectée!')
                  },
                  () => {
                      console.log('years');
                      console.log(this.py);
                  }
              );
          }
      ) ;

      this.test.datasets.push(teste2);

      this.createForm();

  }
    createForm() {
        this.searchPanForm = this.fb.group({
            search: [''],
        });
    }

  ngOnInit() {
    this.selectedPanne = new Pannes();
    this.selectedArret = new Arrets();
    this.TodayPannes();
    this.LoadArrets();
    this.loadDepartements();
    this.countAllPannes();
    this.countDepPannes();
    this.getChart();
    // this.getChart2();
    this.getChart3();
    this.mdtAlpicam();
    this.mtbfAlpicam();
    this.radialBar();
    this.countThisYear();
    this.ThisWeekPanne();

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

  TodayPannes(){

    this.panneService.getTodayPannes().subscribe(
        data => {
          this.pannes = data;
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

  countAllPannes(){

        this.panneService.getCountPannes().subscribe(
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

  getChart2(){

        const datasetNbrePanne2 = {
            label: 'Pannes',
            data: [],
            datalabels: {
                display: false,
            }
        };

        this.panneService.getCountPannes().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.labels = (mach.machine);
                datasetNbrePanne2.data = (mach.nbre);
            } ) );

        // this.lineChartData.push(datasetNbrePanne2);
        // this.donnees.value = datasetNbrePanne2.value;
        // this.don.push(this.donnees);
        this.datasets.push(datasetNbrePanne2);


    }

  getChart3(){
    const datasetNbrePanne3 = {
        data: [],
        label: "Panne",
        yAxisID: 'y-axis-0'
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

  mdtAlpicam(){
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
        lineChartColors: {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,1)',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,1)'
        },
        type: 'bar',
        order: 1,
        stacked: true
    };

    const mdt = {
        data: [],
        label: "MDT",
        yAxisID: 'y-axis-1',
        lineChartColors: {
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        },
        type: 'line',
        order: 2,
    };
    // this.dashboardService.getmdtThisYearAlpi().subscribe(
    //     list => list.forEach(mach => {
    //         this.TDT += this.TDT + mach.TDT;
    //         // datasetNbrePanne2.name = (mach.machine);
    //         this.mdtByYear.labels.push(this.datePipe.transform(mach.date, 'MMM'));
    //         wt.data.push(mach.WT);
    //         ttr.data.push(mach.MTTR);
    //         mdt.data.push(mach.MDT);
    //
    //     } )) ;


    //
    //   this.all = fromArray(this.years, this.month);
    //   array3.forEach(mach => {
    //               this.mdtByYear.labels.push(mach.date);
    //               wt.data.push(mach.WT);
    //               ttr.data.push(mach.MTTR);
    //               mdt.data.push(mach.MDT);
    //
    //           } );

      // for (let mach of array3){
      //     this.mdtByYear.labels.push(mach.date);
      //     wt.data.push(mach.WT);
      //     ttr.data.push(mach.MTTR);
      //     mdt.data.push(mach.MDT);
      // }

      // this.mdtByYear.datasets.push(wt);
      // this.mdtByYear.datasets.push(ttr);
      // this.mdtByYear.datasets.push(mdt);

      this.dashboardService.getmdtThisYearAlpi().subscribe(
          data => {
              this.pm = data;
              this.dashboardService.getmdtByYearAlpi().subscribe(
                  datas => {
                      this.py = datas;
                      this.pt = this.py.concat(this.pm);
                      console.log('concat '+this.pt)

                      for (let mach of this.pt){
                              this.mdtByYear.labels.push(mach.date);
                              wt.data.push(mach.WT);
                              ttr.data.push(mach.MTTR);
                              mdt.data.push(mach.MDT);
                          }
                  },
                  error => {
                      console.log('une erreur a été détectée!')
                  },
                  () => {
                      console.log('years');
                      console.log(this.py);
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
        );


      this.mdtByYear.datasets.push(wt);
      this.mdtByYear.datasets.push(ttr);
      this.mdtByYear.datasets.push(mdt);

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
        name: 'Nombre de Pannes'
    };
    const test1 = {
        categories: [] ,
    };
    const tdt = {
        data: [],
        label: "TDT",
        yAxisID: 'y-axis-1',
        lineChartColors: {
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,255,255,1)',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,1)'
        },
        type: 'bar',
    };

    const panne = {
        data: [],
        label: "Pannes",
        yAxisID: 'y-axis-1',
        lineChartColors: {
            backgroundColor: 'transparent',
            borderColor: 'rgba(255,255,255,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        },
        type: 'line',
    };

      this.dashboardService.mtbfByYearAlpi().subscribe(
          data1 => {
          this.mtbfY = data1;
          this.dashboardService.mtbfThisYearAlpi().subscribe(
              data2 => {
                  this.mtbfTY = data2;
                  this.mtbf = this.mtbfY.concat(this.mtbfTY);
                  console.log('concat '+this.mtbf)

                  for (let mach of this.mtbf){
                      this.mtbfByYear.labels.push(mach.date);
                      // test1.categories.push(mach.date);
                      if ((mach.AT.toString() == 'null') && (mach.nbre == 0)){
                          console.log('AT: '+mach.AT);
                          console.log('HT: '+mach.HT);
                          console.log('TDT: '+mach.TDT);
                          mach.TDT = 0;
                          mach.AT = 0;
                          mach.nbre = 0;
                          console.log('AT après: '+mach.AT);
                          console.log('HT après: '+mach.HT);
                          console.log('TDT après: '+mach.TDT);
                          var z = mach.HT;
                          console.log('Mois et Time: '+ mach.date +' '+z);

                          mtbf.data.push(Math.trunc(z));
                      }
                      else if(mach.AT.toString() == 'null'){

                          var y = mach.TDT/60;


                          var z = mach.HT - y;


                          var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                          var mt = z / a;


                          var x = (mach.HT-y )/(Number.parseInt(mach.nbre.toString())+1);

                          mtbf.data.push(Math.trunc(mt));
                      }
                      else if(mach.TDT.toString() == 'null'){
                          mach.TDT = 0;
                          var y = mach.AT/60;

                          var z = mach.HT - y;


                          var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                          var mt = z / a;


                          mtbf.data.push(Math.trunc(mt));
                      }
                      else {
                          var x = mach.AT/60;
                          var y = mach.TDT/60;
                          var z = mach.HT - (x+y);


                          var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                          var mt = z / a;
                          mtbf.data.push(Math.trunc(mt));
                      }



                      // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                      panne.data.push(mach.nbre);
                      tdt.data.push(mach.TDT);
                      teste.data.push(mach.nbre);
                  }
              },
              error => {
                  console.log('une erreur a été détectée!')
              },
              () => {
                  console.log('years');
                  console.log(this.py);
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
      // this.test.datasets.push(teste);
      this.labs.categories.push(this.mtbfByYear.labels);


    }

    //modal
    open(content){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
                this.closeResult = `Closed with: ${result}`;
            }, (reason) =>{

            }
        );
    }


    radialBar(){

        this.dashboardService.getCountDepPannes().subscribe(

            data => {
                this.cdpannes = data;
                var x = 0;
                for (let pin of this.cdpannes){
                    x = x + pin.nbre;
                }
                var options = {
                    chart: {
                        height: 200,
                        type: "radialBar",
                    },

                    series: [x],
                    colors: ["#20E647"],
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
                            type: "vertical",
                            gradientToColors: ["#87D4F9"],
                            stops: [0, 100]
                        }
                    },
                    stroke: {
                        lineCap: "round"
                    },
                    labels: ["Total Pannes"]
                };

                var chart = new ApexCharts(document.querySelector("#chart"), options);

                chart.render();

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

    ThisWeekPanne(){

        this.panneService.getThisWeekPannes().subscribe(
            data => {
                this.ThisWeekPannes = data;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('panne cette semaine');
                console.log(this.ThisWeekPannes);
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
}
