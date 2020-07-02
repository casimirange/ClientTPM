import { Component, OnInit } from '@angular/core';
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {Pannes} from "../../Models/pannes";
import {DatePipe} from "@angular/common";
import {Color} from "ng2-charts";
import {ApexXAxis, NgApexchartsModule} from "ng-apexcharts";
import {AlpicamService} from "../../services/alpicam/alpicam.service";
import {DepartementsService} from "../../services/departements/departements.service";
import {Departement} from "../../Models/departement";
import {ApexOptions} from 'apexcharts'


@Component({
  selector: 'app-stats-global',
  templateUrl: './stats-global.component.html',
  styleUrls: ['./stats-global.component.css']
})
export class StatsGlobalComponent implements OnInit {
  headings = 'Statistiques Alpicam';
  subheadings = 'Découvrez les données statistiques de l\'entreprise ';
  icons = 'pe-7s-graph icon-gradient bg-royal';

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

  catP = {
    labels: [],
    datasets: []
  };

  dta = [];

  public colors: Color[] = [
    { // grey
      backgroundColor: 'rgba(20, 143, 222, 0.2)',
      borderColor: '#148fde',
      borderCapStyle: 'round',
      borderDash: [],
      borderWidth: 1,
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBorderColor: '#148fde',
      pointBackgroundColor: '#fff',
      pointHoverBorderWidth: 4,
      pointRadius: 6,
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHitRadius: 10,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#148fde',
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
      borderColor: '#ff4560',
      pointBackgroundColor: 'rgba(225,69,96,1)',
      pointBorderColor: '#ff4560',
      pointHoverBackgroundColor: '#ff4560',
      pointHoverBorderColor: 'rgba(225,69,96,0.8)'
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
    height: 'auto',
    type: "bar",
    zoom: {
      enabled: false
    }
  }
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
  // series = [1,2,3];
  // labels = ['2f', '4g', 'E+'];

  constructor(private dashboardService: DashboardService,
              private datePipe: DatePipe,
              private departementService: DepartementsService,
              private alpicamService: AlpicamService) { }

  ngOnInit() {
    this.mdtAlpicam();
    this.mtbfAlpicam();
    this.radialBar();
    this.paretoAlpi();
    this.typePanne();
    this.loadDepartements();
  }

  mdtAlpicam(){
    // const wt = {
    //   data: [],
    //   label: "WT",
    //   yAxisID: 'y-axis-0',
    //   type: 'bar',
    //   order: 1,
    //   stacked: true
    // };
    // const ttr = {
    //   data: [],
    //   label: "TTR",
    //   yAxisID: 'y-axis-0',
    //   lineChartColors: {
    //     backgroundColor: 'rgba(255,255,255,0.2)',
    //     borderColor: 'rgba(255,255,255,1)',
    //     pointBackgroundColor: 'rgba(255,255,255,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(255,255,255,1)'
    //   },
    //   type: 'bar',
    //   order: 1,
    //   stacked: true
    // };
    //
    // const mdt = {
    //   data: [],
    //   label: "MDT",
    //   yAxisID: 'y-axis-1',
    //   lineChartColors: {
    //     backgroundColor: 'transparent',
    //     borderColor: 'rgba(255,255,255,1)',
    //     pointBackgroundColor: 'rgba(148,159,177,1)',
    //     pointBorderColor: '#fff',
    //     pointHoverBackgroundColor: '#fff',
    //     pointHoverBorderColor: 'rgba(148,159,177,0.8)',
    //   },
    //   type: 'line',
    //   order: 2,
    // };
    //
    // this.dashboardService.getmdtThisYearAlpi().subscribe(
    //     data => {
    //       this.pm = data;
    //       this.dashboardService.getmdtByYearAlpi().subscribe(
    //           datas => {
    //             this.py = datas;
    //             this.pt = this.py.concat(this.pm);
    //             console.log('concat '+this.pt)
    //
    //             for (let mach of this.pt){
    //               this.mdtByYear.labels.push(mach.date);
    //               wt.data.push(mach.WT);
    //               ttr.data.push(mach.MTTR);
    //               mdt.data.push(mach.MDT);
    //             }
    //           },
    //           error => {
    //             console.log('une erreur a été détectée!')
    //           },
    //           () => {
    //             console.log('years');
    //             console.log(this.py);
    //           }
    //       );
    //     },
    //     error => {
    //       console.log('une erreur a été détectée!')
    //     },
    //     () => {
    //       console.log('months');
    //       console.log(this.pm);
    //     }
    // );
    //
    //
    // this.mdtByYear.datasets.push(wt);
    // this.mdtByYear.datasets.push(ttr);
    // this.mdtByYear.datasets.push(mdt);

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
      categories: []
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
                  this.mdtByYear.labels.push(mach.date);
                  test1.categories.push(mach.date);

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

                  wt.data.push(mach.WT/mach.nbre);
                  ttr.data.push(mach.TTR/mach.nbre);
                  mdt.data.push(mach.TDT/mach.nbre);

                }
                console.log('testons voir :' + JSON.stringify(test1));
                this.labs = test1;
                console.log('dépassé: '+this.labs.valueOf())
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
    this.test.datasets.push(teste);

    this.mdtByYear.datasets.push(wt);
    this.mdtByYear.datasets.push(ttr);
    this.mdtByYear.datasets.push(mdt);
    // this.labs.categories.push(this.mtbfByYear.labels);
    // this.labs.categories.push(test1.categories)

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
              height: 350,
              type: "radialBar",
              toolbar: {
                show: true
              }
            },

            series: [x],

            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                hollow: {
                  margin: 0,
                  size: "70%",
                  background: "#fff",
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#fff',
                  strokeWidth: '67%',
                  margin: 0,
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    color: "#888",
                    fontSize: "17px"
                  },
                  value: {
                    color: "#111",
                    fontSize: "36px",
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
                shadeIntensity: 0.5,
                gradientToColors: ["#ABE5A1"],
                stops: [0, 100],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
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

  paretoAlpi(){
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-0',
      type: 'bar'
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

  typePanne(){
    const datasetNbrePanne4 = {
      data: [],
    };
    const datasetNbrePanne3 = [];
    this.alpicamService.getTypePanneThisYear().subscribe(
        list => list.forEach(mach => {
          this.test1.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.catP.labels.push(mach.fonction.substr(0, 4).replace(/é|è|ê/g, "e").toUpperCase());
          this.test1.series.push(mach.nbre);
          // datasetNbrePanne4.data.push(mach.nbre);
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
}
