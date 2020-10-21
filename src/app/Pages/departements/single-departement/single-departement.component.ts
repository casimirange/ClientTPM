import {Component, OnInit, ViewChild} from '@angular/core';
import {DepartementsService} from "../../../services/departements/departements.service";
import {Departement} from "../../../Models/departement";
import {Route} from "@angular/compiler/src/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {DatePipe, formatNumber} from "@angular/common";
import {__param} from "tslib";
import {LignesService} from "../../../services/lignes/lignes.service";
import {Ligne} from "../../../Models/lignes";
import {MachinesService} from "../../../services/machines/machines.service";
import {Machine} from "../../../Models/machines";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pannes} from "../../../Models/pannes";
import {PannesService} from "../../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'lodash';
import {sortBy} from "sort-by-typescript";
import {DashboardService} from "../../../services/dashboard/dashboard.service";
import {ChartComponent} from "ng-apexcharts";
import {angularClassDecoratorKeys} from "codelyzer/util/utils";
import {Color} from "ng2-charts";


@Component({
  selector: 'app-single-departement',
  templateUrl: './single-departement.component.html',
  styleUrls: ['./single-departement.component.css']
})
export class SingleDepartementComponent implements OnInit {

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<any>;
  public TDTOptions: Partial<any>;
  public MDTOptions: Partial<any>;
  public HOUROptions: Partial<any>;

  heading = "dep";
  subheading = 'Gérez les départements dans l\'application';
  icon = 'fa fa-home icon-gradient';
  bg = 'text-white bg-midnight-bloom';
  series1 = [];
  series2 = [];
  series3 = [];
  series4 = [];

  // departements: Departement[];

  deps: Departement;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  rangeForm: FormGroup;
  dashPanForm: FormGroup;
  pageForm: FormGroup;
  selectedDep: Departement;
  selectedMachine: Machine;
  selectedLigne: Ligne;
  lignes: Ligne[];
  machines: Machine[];
  pannes: Pannes[];
  nomMaj:string;
  ranger:string = "false";
  ranges:string = "false";
  pages:number = 7;
  cpannes: Pannes[];
  Tpannes: Pannes[];
  Opannes: Pannes[];
  Detailspannes: Pannes[];
  Outilpannes: Pannes[];
  Hpannes: Pannes[];
  times: Pannes[];
  selectedPanne: Pannes;
  countThisMonthPanneTDT: number;
  countThisMonthPannenbre: number;
  countThisMonthPanneMDT: number;
  countLastMonthPanneTDT: number;
  countLastMonthPannenbre: number;
  countLastMonthPanneMDT: number;
  hourThisMonth: any;
  hourLastMonth: any;
  closeResult: any;
  tail: number;
  tails: number;

  py: Pannes[];
  pm: Pannes[];
  pt: Pannes[];
  mtbfY: Pannes[];
  mtbfTY: Pannes[];
  mtbf: Pannes[];

  // placage
  L1mtbfY: any[];
  L1mtbfTY: any[];
  L1mtbf: any[];

  L2mtbfY: any[];
  L2mtbfTY: any[];
  L2mtbf: any[];

  L3mtbfY: any[];
  L3mtbfTY: any[];
  L3mtbf: any[];

  SecmtbfY: any[];
  SecmtbfTY: any[];
  Secmtbf: any[];

  EcmtbfY: any[];
  EcmtbfTY: any[];
  Ecmtbf: any[];

  JmtbfY: any[];
  JmtbfTY: any[];
  Jmtbf: any[];

  L1mdtByYear = {
      labels: [],
      datasets: []
  };

  L1mtbfByYear = {
      labels: [],
      datasets: []
  };

    L2mdtByYear = {
        labels: [],
        datasets: []
    };

    L2mtbfByYear = {
        labels: [],
        datasets: []
    };

    L3mdtByYear = {
        labels: [],
        datasets: []
    };

    L3mtbfByYear = {
        labels: [],
        datasets: []
    };

    SmdtByYear = {
        labels: [],
        datasets: []
    };

    SmtbfByYear = {
        labels: [],
        datasets: []
    };

    EmdtByYear = {
        labels: [],
        datasets: []
    };

    EmtbfByYear = {
        labels: [],
        datasets: []
    };

    JmdtByYear = {
        labels: [],
        datasets: []
    };

    JmtbfByYear = {
        labels: [],
        datasets: []
    };

  // brazil
  EBmtbfY: any[];
  EBmtbfTY: any[];
  EBmtbf: any[];

  TEmtbfY: any[];
  TEmtbfTY: any[];
  TEmtbf: any[];

  TRmtbfY: any[];
  TRmtbfTY: any[];
  TRmtbf: any[];

    EBmdtByYear = {
        labels: [],
        datasets: []
    };

    EBmtbfByYear = {
        labels: [],
        datasets: []
    };

    TEmdtByYear = {
        labels: [],
        datasets: []
    };

    TEmtbfByYear = {
        labels: [],
        datasets: []
    };

    TRmdtByYear = {
        labels: [],
        datasets: []
    };

    TRmtbfByYear = {
        labels: [],
        datasets: []
    };

    // ContrePlaqué

    ECPmtbfY: any[];
    ECPmtbfTY: any[];
    ECPmtbf: any[];

    POmtbfY: any[];
    POmtbfTY: any[];
    POmtbf: any[];

    PRmtbfY: any[];
    PRmtbfTY: any[];
    PRmtbf: any[];

    ECPmdtByYear = {
        labels: [],
        datasets: []
    };

    ECPmtbfByYear = {
        labels: [],
        datasets: []
    };

    POmdtByYear = {
        labels: [],
        datasets: []
    };

    POmtbfByYear = {
        labels: [],
        datasets: []
    };

    PRmdtByYear = {
        labels: [],
        datasets: []
    };

    PRmtbfByYear = {
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
    datasets: []
  };


  paretoMonth = {
    labels: [],
    datasets: []
  };


  DerouleuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  DerouleuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };


  BobineuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  BobineuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };


  MagBobineparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  MagBobineparetoMDTMonth = {
    labels: [],
    datasets: []
  };


  MassicotparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  MassicotparetoMDTMonth = {
    labels: [],
    datasets: []
  };


  SechoirparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  SechoirparetoMDTMonth = {
    labels: [],
    datasets: []
  };


  TrancheuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  TrancheuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };


  EncolleuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };


  EncolleuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  public labs = {
    categories: []
  };

  date_this_month: any;

  datas = {
    labels: [],
    datasets: []
  };
  private cdpannes: any[];

  nbreThisYear: Pannes[];
  depPanneThisYear: number;
  depTDTThisYear: number;
  depMDTThisYear: number;
  depHourThisYear: number;
  nbreLastMonth: Pannes[];
  lastMonth: number;
  cdount: number;

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
      backgroundColor: 'rgba(225,69,96,0.2)',
      borderColor: '#ff4560',
      pointBackgroundColor: 'rgba(225,69,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,69,96,0.8)'
    },
    { // vert MTBF
        backgroundColor: 'rgba(0,142,249,0.4)',
      borderColor: 'rgba(0,142,249,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public colorsParetoTDT: Color[] = [

    { // red Failiure
      backgroundColor: 'rgba(120,60,164,0.2)',
      borderColor: 'rgb(120,60,164)',
      pointBackgroundColor: 'rgba(120,60,164,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(120,60,164,0.8)'
    },
    { // vert MTBF
        backgroundColor: 'rgba(87,144,137,0.7)',
      borderColor: 'rgba(87,144,137,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(120,60,164,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(120,60,164,1)'
    }
  ];

  public colorsParetoMDT: Color[] = [

    { // red Failiure
      backgroundColor: 'rgba(0,142,249,0.2)',
      borderColor: 'rgb(0,142,249)',
      pointBackgroundColor: 'rgba(0,142,249,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,142,249,0.8)'
    },
    { // vert MTBF
        backgroundColor: 'rgba(42,53,79,0.7)',
      borderColor: 'rgba(42,53,79,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(42,53,79,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(42,53,79,1)'
    }
  ];

  nb: number;
  td: number;
  md: number;
  ht: number;

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

  dep: any[];
  term: string;
  p: number;
  f: Date;
  d: Date;
  constructor( private departementService: DepartementsService,
               private ligneService: LignesService,
               private panneService: PannesService,
               private machineService: MachinesService,
               private fb: FormBuilder,
               private modalService: NgbModal,
               private route: ActivatedRoute,
               private dashboardService: DashboardService,
               private datePipe: DatePipe,
               private router: Router
  ) {
    this.selectedDep = new Departement();
    this.selectedLigne = new Ligne();
    this.selectedPanne = new Pannes();
    this.selectedMachine = new Machine();
    this.createForm();
    this.createForms();
    this.rangeForms();
    this.pageForms();
    this.dashForm();

    const dat = new Date();
    this.date_this_month = this.datePipe.transform(dat, 'MMMM yyyy');

    this.route.params.subscribe(params => {
      let url = atob(params['id']);
      const t = 1000;
      this.departementService.countThisMonthPannesDep(Number.parseInt(url)).subscribe(
          data => data.forEach(mach => {
            this.countThisMonthPanneTDT = Number.parseInt(mach.TDT);
            this.countThisMonthPannenbre = Number.parseInt(mach.nbre);
            // if (mach.nbre == 0) {
            //   this.countThisMonthPanneMDT = 0;
            // } else {
              this.countThisMonthPanneMDT = Number.parseInt(mach.nbre) == 0 ? 0 : Math.round(Number.parseInt(mach.TDT) / Number.parseInt(mach.nbre));
            // }
            this.series1.push(Number.parseInt(mach.nbre));
            this.series2.push(Number.parseInt(mach.TDT));
            this.series3.push(this.countThisMonthPanneMDT);
            // var options = {

          },
              error => {
                console.log('une erreur a été détectée!')
              },
              () => {
                console.log('Total');
                // console.log(this.cdount);
              }
              ));

      this.departementService.hourThisMonthDep(Number.parseInt(url)).subscribe(
          datas => {
              this.hourThisMonth = datas ? Number.parseInt(datas.heure) :0;
            // this.hourThisMonth = machs.heure;
            this.series4.push(this.hourThisMonth);

          },
              error => {
                console.log('une erreur a été détectée!')
              },
              () => {
                console.log('heure');
                console.log(this.hourThisMonth);
              }
              );
    });

    this.chartOptions = {
      chart: {
        height: 200,
        type: "radialBar",
      },

      series: [this.series1],

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
          gradientToColors: ["#e3a1e5"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [this.countThisMonthPannenbre > 1 ? "Total Pannes" : "Total Panne"]
    };
    // var options = {
    this.TDTOptions = {
      chart: {
        height: 200,
        type: "radialBar",
      },

      series: [this.series2],

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
              fontSize: "20px"
            },
            value: {
              color: "#fff",
              fontSize: this.countThisMonthPanneTDT >= 10000 ? "25px" : this.countThisMonthPanneTDT >= 1000 ? "28px" : "30px",
              show: true,
              formatter: function (val) {
                return val + " min";
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
          gradientToColors: ["#f65656"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["TDT"]
    };
    // var options = {
    this.MDTOptions = {
      chart: {
        height: 200,
        type: "radialBar",
      },

      series: [this.series3],

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
            // background: "#e5a1b2",
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
              fontSize: "20px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true,
              formatter: function (val) {
                return val + " min";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        // colors: "transparent",
        gradient: {
          shade: "dark",
          type: "vertical",
          // inverseColors: true,
          // gradientToColors: ["#e5d4a1"],
          gradientToColors: ["#f9ce66"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["MDT"]
    };
    // var options ={
    this.HOUROptions = {
      chart: {
        height: 200,
        type: "radialBar",
      },

      series: [this.series4],

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
              fontSize: this.hourThisMonth >= 10000 ? "25px" : this.hourThisMonth >= 1000 ? "28px" : "30px",
              show: true,
              formatter: function (val) {
                return val+" h";
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
          gradientToColors: ["#abe5a1"],
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: ["Total Heures"]
    };
  }

  dashForm() {
    this.dashPanForm = this.fb.group({
      dashPeriode: [''],
    });
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

  ngOnInit() {

    this.showDepartement();
    this.ThisMonthPannes();
    this.ListMachines();
    // this.showPannesDep();
    this.CountMonthPannes();
    this.HourPerMonth();
    this.mtbfAlpicam();
    // this.paretoThysYear();
    this.paretoThysMonth();
    // ligne placage
    this.Ligne1mtbfDep();
    this.Ligne2mtbfDep();
    this.Ligne3mtbfDep();
    this.SechoirmtbfDep();
    this.EcorcagemtbfDep();
    this.JointagemtbfDep();

    // ligne Brazil
    this.EncolleuseBrazilmtbfDep();
    this.TranchagemtbfDep();
    this.TeinturemtbfDep();

    // lignes Contreplaqué
    this.EncolleuseCPmtbfDep();
    this.PonçagemtbfDep();
    this.PressagemtbfDep();

    //Pareto Placage
    this.paretoDerouleuseTDTThysMonth();
    this.paretoDerouleuseMDTThysMonth();
    this.paretoBobineuseTDTThysMonth();
    this.paretoBobineuseMDTThysMonth();
    this.paretoMagasinBobineTDTThysMonth();
    this.paretoMagasinBobineMDTThysMonth();
    this.paretoMassicotTDTThysMonth();
    this.paretoMassicotMDTThysMonth();
    this.paretoSechoirTDTThysMonth();
    this.paretoSechoirMDTThysMonth();
    this.paretoTrancheuseTDTThysMonth();
    this.paretoTrancheuseMDTThysMonth();
    this.paretoEncolleuseTDTThysMonth();
    this.paretoEncolleuseMDTThysMonth();

    // dashboard dep
    this.getChart3();
    this.countThisYear();

    var date = new Date();
    var lastDay = new Date(date.getFullYear()-1, 1, date.setDate(1));
    console.log('la date: '+ lastDay);
  }

  getChart3(){
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
      this.route.params.subscribe(params => {
        let url = atob(params['id']);
        this.departementService.getDashboard(Number.parseInt(url)).subscribe(
            list => list.forEach(mach => {
              // datasetNbrePanne2.name = (mach.machine);
              this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
              datasetNbrePanne3.data.push(mach.nbre);
              datasetNbrePanne4.data.push(mach.dt);
              console.log('nombres : ' + mach.nbre)

            }));
      });
      this.datas.datasets.push(datasetNbrePanne3);
      this.datas.datasets.push(datasetNbrePanne4);

  }

  DashboardThisMonth(){
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
      this.route.params.subscribe(params => {
        let url = atob(params['id']);
        this.departementService.getDashboardThisMonth(Number.parseInt(url)).subscribe(
            list => list.forEach(mach => {
              // datasetNbrePanne2.name = (mach.machine);
              this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
              datasetNbrePanne3.data.push(mach.nbre);
              datasetNbrePanne4.data.push(mach.dt);
              console.log('nombres : ' + mach.nbre)

            }));
      });
      this.datas.datasets.push(datasetNbrePanne3);
      this.datas.datasets.push(datasetNbrePanne4);

  }

  DashboardLastMonth(){
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
      this.route.params.subscribe(params => {
        let url = atob(params['id']);
        this.departementService.getDashboardLastMonth(Number.parseInt(url)).subscribe(
            list => list.forEach(mach => {
              // datasetNbrePanne2.name = (mach.machine);
              this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
              datasetNbrePanne3.data.push(mach.nbre);
              datasetNbrePanne4.data.push(mach.dt);
              console.log('nombres : ' + mach.nbre)

            }));
      });
      this.datas.datasets.push(datasetNbrePanne3);
      this.datas.datasets.push(datasetNbrePanne4);

  }

  DashboardRange(){
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
      this.route.params.subscribe(params => {
        const d1 = this.rangeForm.controls['date1'].value;
        const d2 = this.rangeForm.controls['date2'].value;
        const dat = new Date();
        this.date_this_month = d1 +' au '+ d2;
        let url = atob(params['id']);
        this.departementService.getDashboardRange(Number.parseInt(url), d1, d2).subscribe(
            list => list.forEach(mach => {
              // datasetNbrePanne2.name = (mach.machine);
              this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
              datasetNbrePanne3.data.push(mach.nbre);
              datasetNbrePanne4.data.push(mach.dt);
              console.log('nombres : ' + mach.nbre)

            }));
      });
      this.datas.datasets.push(datasetNbrePanne3);
      this.datas.datasets.push(datasetNbrePanne4);

  }

  countThisYear(){
    this.route.params.subscribe(params => {
      let url = atob(params['id']);
      console.log('url finale: ' +url);
        this.departementService.year(Number.parseInt(url)).subscribe(
            data => {
              for(let pin of data){
                this.depTDTThisYear = pin.TDT;
                this.depPanneThisYear = pin.nbre;
                this.depMDTThisYear = Math.round(pin.MDT);
                this.depHourThisYear = Math.round(pin.hour);
              }
            }
        );
    });
  }

  showDepartement() {
    this.route.params.subscribe(params => {
      let url = atob(params['id']);
      console.log('url finale: ' +url);
      this.departementService.showDep(Number.parseInt(url)).subscribe(
          res => {
            this.selectedDep = res;
            this.nomMaj = this.selectedDep.nom.toUpperCase();
            console.log("liste des lignes1");
            console.log(this.selectedDep);
          }
      )
    })
  }

  ListMachines(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
      this.machineService.getAllMachinesByDepartment(Number.parseInt(url)).subscribe(
          data => {
            this.machines = data.sort(sortBy('machine'));
            console.log("liste des lignes");
            console.log(this.machines);
          }
      )
    })
  }

  showPannesDep() {
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
      this.departementService.showPannesDep(Number.parseInt(url)).subscribe(
          data => {
            this.pannes = data;
            console.log("liste des lignes");
            console.log(this.pannes);
          }
      )
    })
  }

  CountMonthPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);const t = 1000;
      // this.departementService.countThisMonthPannesDep(Number.parseInt(url)).subscribe(
      //     data => data.forEach(mach => {
      //       this.countThisMonthPanneTDT = mach.TDT;
      //       this.countThisMonthPannenbre = mach.nbre;
      //       if(mach.nbre == 0){
      //         this.countThisMonthPanneMDT = 0;
      //       }else{
      //         this.countThisMonthPanneMDT = Math.round(mach.TDT/mach.nbre);
      //       }
      //       this.series1.push(mach.nbre);
      //       this.series2.push(mach.TDT);
      //       this.series3.push(this.countThisMonthPanneMDT);
      //       // var options = {
      //       this.chartOptions = {
      //         chart: {
      //           height: 200,
      //           type: "radialBar",
      //         },
      //
      //         series: [this.series1],
      //
      //         plotOptions: {
      //           radialBar: {
      //             hollow: {
      //               margin: 0,
      //               size: "70%",
      //               background: "#293450",
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 0,
      //                 left: 0,
      //                 blur: 3,
      //                 opacity: 0.5
      //               }
      //             },
      //             track: {
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 2,
      //                 left: 0,
      //                 blur: 4,
      //                 opacity: 0.15
      //               }
      //             },
      //             dataLabels: {
      //               name: {
      //                 offsetY: -10,
      //                 color: "#fff",
      //                 fontSize: "13px"
      //               },
      //               value: {
      //                 color: "#fff",
      //                 fontSize: "30px",
      //                 show: true,
      //                 formatter: function (val) {
      //                   return val;
      //                 }
      //               }
      //             }
      //           }
      //         },
      //         fill: {
      //           type: "gradient",
      //           gradient: {
      //             shade: "dark",
      //             type: "horizontal",
      //             gradientToColors: ["#e3a1e5"],
      //             stops: [0, 100]
      //           }
      //         },
      //         stroke: {
      //           lineCap: "round"
      //         },
      //         labels: [mach.nbre > 1 ? "Total Pannes" : "Total Panne"]
      //       };
      //       // var options = {
      //       this.TDTOptions = {
      //         chart: {
      //           height: 200,
      //           type: "radialBar",
      //         },
      //
      //         series: [this.series2],
      //
      //         plotOptions: {
      //           radialBar: {
      //             hollow: {
      //               margin: 0,
      //               size: "70%",
      //               background: "#293450",
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 0,
      //                 left: 0,
      //                 blur: 3,
      //                 opacity: 0.5
      //               }
      //             },
      //             track: {
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 2,
      //                 left: 0,
      //                 blur: 4,
      //                 opacity: 0.15
      //               }
      //             },
      //             dataLabels: {
      //               name: {
      //                 offsetY: -10,
      //                 color: "#fff",
      //                 fontSize: "20px"
      //               },
      //               value: {
      //                 color: "#fff",
      //                 fontSize: this.countThisMonthPanneTDT >= 10000 ? "25px" : this.countThisMonthPanneTDT >= 1000 ? "28px" : "30px",
      //                 show: true,
      //                 formatter: function (val) {
      //                   return val + " min";
      //                 }
      //               }
      //             }
      //           }
      //         },
      //         fill: {
      //           type: "gradient",
      //           gradient: {
      //             shade: "dark",
      //             type: "horizontal",
      //             gradientToColors: ["#f65656"],
      //             stops: [0, 100]
      //           }
      //         },
      //         stroke: {
      //           lineCap: "round"
      //         },
      //         labels: ["TDT"]
      //       };
      //       // var options = {
      //       this.MDTOptions = {
      //         chart: {
      //           height: 200,
      //           type: "radialBar",
      //         },
      //
      //         series: [this.series3],
      //
      //         plotOptions: {
      //           radialBar: {
      //             hollow: {
      //               margin: 0,
      //               size: "70%",
      //               background: "#293450",
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 0,
      //                 left: 0,
      //                 blur: 3,
      //                 opacity: 0.5
      //               }
      //             },
      //             track: {
      //               // background: "#e5a1b2",
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 2,
      //                 left: 0,
      //                 blur: 4,
      //                 opacity: 0.15
      //               }
      //             },
      //             dataLabels: {
      //               name: {
      //                 offsetY: -10,
      //                 color: "#fff",
      //                 fontSize: "13px"
      //               },
      //               value: {
      //                 color: "#fff",
      //                 fontSize: "30px",
      //                 show: true,
      //                 formatter: function (val) {
      //                   return val+" min";
      //                 }
      //               }
      //             }
      //           }
      //         },
      //         fill: {
      //           type: "gradient",
      //           // colors: "transparent",
      //           gradient: {
      //             shade: "dark",
      //             type: "vertical",
      //             // inverseColors: true,
      //             // gradientToColors: ["#e5d4a1"],
      //             gradientToColors: ["#f9ce66"],
      //             stops: [0, 100]
      //           }
      //         },
      //         stroke: {
      //           lineCap: "round",
      //         },
      //         labels: ["MDT"]
      //       };
      //
      //     }));
      this.departementService.countLastMonthPannesDep(Number.parseInt(url)).subscribe(
          list => list.forEach(mach => {
            this.countLastMonthPanneTDT = Number.parseInt(mach.TDT);
            this.countLastMonthPannenbre = Number.parseInt(mach.nbre);
            if(mach.nbre == 0){
              this.countLastMonthPanneMDT = 0;
            }else{
              this.countLastMonthPanneMDT = Math.round(mach.TDT/mach.nbre);
            }
          }));
    });
  }
  HourPerMonth(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
      // this.departementService.hourThisMonthDep(Number.parseInt(url)).subscribe(
      //     data => {
      //       this.hourThisMonth = data ? data : 0;
      //       this.series4.push(this.hourThisMonth.heure);
      //       // var options = {
      //       this.HOUROptions = {
      //         chart: {
      //           height: 200,
      //           type: "radialBar",
      //         },
      //
      //         series: [this.series4],
      //
      //         plotOptions: {
      //           radialBar: {
      //             hollow: {
      //               margin: 0,
      //               size: "70%",
      //               background: "#293450",
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 0,
      //                 left: 0,
      //                 blur: 3,
      //                 opacity: 0.5
      //               }
      //             },
      //             track: {
      //               dropShadow: {
      //                 enabled: true,
      //                 top: 2,
      //                 left: 0,
      //                 blur: 4,
      //                 opacity: 0.15
      //               }
      //             },
      //             dataLabels: {
      //               name: {
      //                 offsetY: -10,
      //                 color: "#fff",
      //                 fontSize: "13px"
      //               },
      //               value: {
      //                 color: "#fff",
      //                 fontSize: this.hourThisMonth.heure >= 10000 ? "25px" : this.hourThisMonth.heure >= 1000 ? "28px" : "30px",
      //                 show: true,
      //                 formatter: function (val) {
      //                   return val+" h";
      //                 }
      //               }
      //             }
      //           }
      //         },
      //         fill: {
      //           type: "gradient",
      //           gradient: {
      //             shade: "dark",
      //             type: "horizontal",
      //             gradientToColors: ["#abe5a1"],
      //             stops: [0, 100]
      //           }
      //         },
      //         stroke: {
      //           lineCap: "round"
      //         },
      //         labels: ["Total Heures"]
      //       };
      //     }
      // ),
      this.departementService.hourLastMonthDep(Number.parseInt(url)).subscribe(
          data => {
              this.hourLastMonth = data ? data.heure : 0;
          });
    });
  }



  // loadTimePannes(){
  //   this.panneService.getTimePannes().subscribe(
  //       data => {
  //         this.times = data;
  //         this.tails = this.times.length;
  //         for (let pin of data){
  //           this.selectedPanne.heureArret = pin.heureArret;
  //         }
  //
  //       }
  //   );
  // }

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
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getTodayPannes(Number.parseInt(url)).subscribe(
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
    );})
  }

  HierPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getHierPannes(Number.parseInt(url)).subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne hier');
          console.log(this.pannes);
        }
    );})
  }

  ThisWeekPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getThisWeekPannes(Number.parseInt(url)).subscribe(
        data => {
          this.pannes = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('panne cette semaine');
          console.log(this.pannes);
        }
    );})
  }

  LastWeekPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getLastWeekPannes(Number.parseInt(url)).subscribe(
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
    );})
  }

  LastMonthPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getLastMonthPannes(Number.parseInt(url)).subscribe(
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
    );})
  }

  ThisMonthPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getThisMonthPannes(Number.parseInt(url)).subscribe(
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
    );})
  }

  LastYearPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getLastYearPannes(Number.parseInt(url)).subscribe(
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
    );})
  }

  ThisYearPannes(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.getThisYearPannes(Number.parseInt(url)).subscribe(
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
    );})
  }

  rangeDate(){
    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    console.log('rien');
    const d1 = this.rangeForm.controls['date1'].value;
    const d2 = this.rangeForm.controls['date2'].value;

    console.log(d1 + ' et '+ d2);

    this.departementService.getRangeDatePannes(Number.parseInt(url), d1, d2).subscribe(
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
    );})
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

  mtbfAlpicam(){
    const mtbf = {
      data: [],
      label: "MTBF",
      yAxisID: 'y-axis-0',
      type: 'bar',
    };
    const mdt = {
      data: [],
      label: "MDT",
      yAxisID: 'y-axis-0',
      type: 'line',
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
      type: 'bar',
    };
    const wt = {
      data: [],
      label: "MWT",
      yAxisID: 'y-axis-1',
      type: 'bar',
    };
    const ttr = {
      data: [],
      label: "MTTR",
      yAxisID: 'y-axis-1',
      type: 'bar',
    };

    const panne = {
      data: [],
      label: "Pannes",
      yAxisID: 'y-axis-1',
      type: 'line',
    };

    this.route.params.subscribe(params =>{
      let url = atob(params['id']);
    this.departementService.mtbfByYear(Number.parseInt(url)).subscribe(
      data1 => {
        this.mtbfY = data1;
        // for (let x of this.mtbfY){
        //   this.depPanneThisYear = x.nbre;
        //   this.depTDTThisYear= x.TDT;
        //   this.depMDTThisYear = Math.round(x.TDT / x.nbre);
        //   this.depHourThisYear = x.HT;
        // }
        this.departementService.mtbfThisYear(Number.parseInt(url)).subscribe(
          data2 => {
            this.mtbfTY = data2;
            this.mtbf = this.mtbfY.concat(this.mtbfTY);
            console.log('concat '+this.mtbf)

            for (let mach of this.mtbf){
              this.mtbfByYear.labels.push(mach.date);
              this.mdtByYear.labels.push(mach.date);
              test1.categories.push(mach.date);

                // var x = mach.AT/60;
                var y = mach.TDT/60;
                // var z = mach.HT - (x+y);
                var z = mach.HT - (y);


                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                var mt = z / a;
                mtbf.data.push(Math.trunc(mt));

              // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
              panne.data.push(mach.nbre);
              tdt.data.push(mach.TDT);
              ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
              wt.data.push(Math.trunc(mach.WT/mach.nbre));
              mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
              teste.data.push(mach.nbre);

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
  });

    this.mtbfByYear.datasets.push(mtbf);
    this.mtbfByYear.datasets.push(tdt);
    this.mtbfByYear.datasets.push(panne);

    this.mdtByYear.datasets.push(wt);
    this.mdtByYear.datasets.push(ttr);
    this.mdtByYear.datasets.push(mdt);
    this.test.datasets.push(teste);
    // this.labs.categories.push(this.mtbfByYear.labels);
    // this.labs.categories.push(test1.categories)

  }

  paretoDepRange(){
    this.paretoMonth.labels = [];
    this.paretoMonth.datasets = [];
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-1',
      type: 'line'
    };
    const datasetNbrePanne4 = {
      data: [],
      label: "Total Down Time",
      yAxisID: 'y-axis-0',
      type: 'bar'
    };
    this.route.params.subscribe(params => {
      let url = atob(params['id']);
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
      this.departementService.paretoDepRange(Number.parseInt(url), d1, d2).subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.paretoMonth.labels.push(mach.nom);
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        }));
    });
    this.paretoMonth.datasets.push(datasetNbrePanne3);
    this.paretoMonth.datasets.push(datasetNbrePanne4);
  }

  paretoThysMonth(){
    this.paretoMonth.labels = [];
    this.paretoMonth.datasets = [];
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-1',
      type: 'line'
    };
    const datasetNbrePanne4 = {
      data: [],
      label: "Total Down Time",
      yAxisID: 'y-axis-0',
      type: 'bar'
    };
    this.route.params.subscribe(params => {
      let url = atob(params['id']);
      this.departementService.paretoThisMonth(Number.parseInt(url)).subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.paretoMonth.labels.push(mach.nom);
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        }));
    });
    this.paretoMonth.datasets.push(datasetNbrePanne3);
    this.paretoMonth.datasets.push(datasetNbrePanne4);
  }

  paretoLastMonth(){
    this.paretoMonth.labels = [];
    this.paretoMonth.datasets = [];
    const datasetNbrePanne3 = {
      data: [],
      label: "Panne",
      yAxisID: 'y-axis-1',
      type: 'line'
    };
    const datasetNbrePanne4 = {
      data: [],
      label: "Total Down Time",
      yAxisID: 'y-axis-0',
      type: 'bar'
    };
    this.route.params.subscribe(params => {
      let url = atob(params['id']);
      this.departementService.paretoLastMonth(Number.parseInt(url)).subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.paretoMonth.labels.push(mach.nom);
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        }));
    });
    this.paretoMonth.datasets.push(datasetNbrePanne3);
    this.paretoMonth.datasets.push(datasetNbrePanne4);
  }

  // Placage
  Ligne1mtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.ligne1ByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.L1mtbfY = data1;
                    this.departementService.ligne1ThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.L1mtbfTY = data2;
                            this.L1mtbf = this.L1mtbfY.slice((this.L1mtbfY.length -6), this.L1mtbfY.length).concat(this.L1mtbfTY);
                            console.log('concat '+this.L1mtbf);

                            for (let mach of this.L1mtbf){
                                this.L1mtbfByYear.labels.push(mach.date);
                                this.L1mdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.L1mtbfByYear.datasets.push(mtbf);
        this.L1mtbfByYear.datasets.push(tdt);
        this.L1mtbfByYear.datasets.push(panne);

        this.L1mdtByYear.datasets.push(wt);
        this.L1mdtByYear.datasets.push(ttr);
        this.L1mdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

}

  Ligne2mtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.ligne2ByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.L2mtbfY = data1;
                    this.departementService.ligne2ThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.L2mtbfTY = data2;
                            this.L2mtbf = this.L2mtbfY.concat(this.L2mtbfTY);
                            console.log('concat '+this.L2mtbf);

                            for (let mach of this.L2mtbf){
                                this.L2mtbfByYear.labels.push(mach.date);
                                this.L2mdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.L2mtbfByYear.datasets.push(mtbf);
        this.L2mtbfByYear.datasets.push(tdt);
        this.L2mtbfByYear.datasets.push(panne);

        this.L2mdtByYear.datasets.push(wt);
        this.L2mdtByYear.datasets.push(ttr);
        this.L2mdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  Ligne3mtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.ligne3ByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.L3mtbfY = data1;
                    this.departementService.ligne3ThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.L3mtbfTY = data2;
                            this.L3mtbf = this.L3mtbfY.concat(this.L3mtbfTY);
                            console.log('concat '+this.L3mtbf);

                            for (let mach of this.L3mtbf){
                                this.L3mtbfByYear.labels.push(mach.date);
                                this.L3mdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.L3mtbfByYear.datasets.push(mtbf);
        this.L3mtbfByYear.datasets.push(tdt);
        this.L3mtbfByYear.datasets.push(panne);

        this.L3mdtByYear.datasets.push(wt);
        this.L3mdtByYear.datasets.push(ttr);
        this.L3mdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  SechoirmtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.sechoirByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.SecmtbfY = data1;
                    this.departementService.sechoirThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.SecmtbfTY = data2;
                            this.Secmtbf = this.SecmtbfY.concat(this.SecmtbfTY);
                            console.log('concat '+this.Secmtbf);

                            for (let mach of this.Secmtbf){
                                this.SmtbfByYear.labels.push(mach.date);
                                this.SmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.SmtbfByYear.datasets.push(mtbf);
        this.SmtbfByYear.datasets.push(tdt);
        this.SmtbfByYear.datasets.push(panne);

        this.SmdtByYear.datasets.push(wt);
        this.SmdtByYear.datasets.push(ttr);
        this.SmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  EcorcagemtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.ecorcageByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.EcmtbfY = data1;
                    this.departementService.ecorcageThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.EcmtbfTY = data2;
                            this.Ecmtbf = this.EcmtbfY.concat(this.EcmtbfTY);
                            console.log('concat '+this.Ecmtbf);

                            for (let mach of this.Ecmtbf){
                                this.EmtbfByYear.labels.push(mach.date);
                                this.EmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.EmtbfByYear.datasets.push(mtbf);
        this.EmtbfByYear.datasets.push(tdt);
        this.EmtbfByYear.datasets.push(panne);

        this.EmdtByYear.datasets.push(wt);
        this.EmdtByYear.datasets.push(ttr);
        this.EmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  JointagemtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.jointageByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.JmtbfY = data1;
                    this.departementService.jointageThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.JmtbfTY = data2;
                            this.Jmtbf = this.JmtbfY.concat(this.JmtbfTY);
                            console.log('concat '+this.Jmtbf);

                            for (let mach of this.Jmtbf){
                                this.JmtbfByYear.labels.push(mach.date);
                                this.JmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.JmtbfByYear.datasets.push(mtbf);
        this.JmtbfByYear.datasets.push(tdt);
        this.JmtbfByYear.datasets.push(panne);

        this.JmdtByYear.datasets.push(wt);
        this.JmdtByYear.datasets.push(ttr);
        this.JmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

    // Brazil
  EncolleuseBrazilmtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.encollageBrazilByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.EBmtbfY = data1;
                    this.departementService.encollageBrazilThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.EBmtbfTY = data2;
                            this.EBmtbf = this.EBmtbfY.concat(this.EBmtbfTY);
                            console.log('concat '+this.EBmtbf);

                            for (let mach of this.EBmtbf){
                                this.EBmtbfByYear.labels.push(mach.date);
                                this.EBmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.EBmtbfByYear.datasets.push(mtbf);
        this.EBmtbfByYear.datasets.push(tdt);
        this.EBmtbfByYear.datasets.push(panne);

        this.EBmdtByYear.datasets.push(wt);
        this.EBmdtByYear.datasets.push(ttr);
        this.EBmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  TeinturemtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.teintureByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.TEmtbfY = data1;
                    this.departementService.teintureThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.TEmtbfTY = data2;
                            this.TEmtbf = this.TEmtbfY.concat(this.TEmtbfTY);
                            console.log('concat '+this.TEmtbf);

                            for (let mach of this.TEmtbf){
                                this.TEmtbfByYear.labels.push(mach.date);
                                this.TEmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.TEmtbfByYear.datasets.push(mtbf);
        this.TEmtbfByYear.datasets.push(tdt);
        this.TEmtbfByYear.datasets.push(panne);

        this.TEmdtByYear.datasets.push(wt);
        this.TEmdtByYear.datasets.push(ttr);
        this.TEmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  TranchagemtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.tranchageByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.TRmtbfY = data1;
                    this.departementService.tranchageThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.TRmtbfTY = data2;
                            this.TRmtbf = this.TRmtbfY.concat(this.TRmtbfTY);
                            console.log('concat '+this.TRmtbf);

                            for (let mach of this.TRmtbf){
                                this.TRmtbfByYear.labels.push(mach.date);
                                this.TRmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.TRmtbfByYear.datasets.push(mtbf);
        this.TRmtbfByYear.datasets.push(tdt);
        this.TRmtbfByYear.datasets.push(panne);

        this.TRmdtByYear.datasets.push(wt);
        this.TRmdtByYear.datasets.push(ttr);
        this.TRmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  // ContrePlaqué
  EncolleuseCPmtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.encollageCPByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.ECPmtbfY = data1;
                    this.departementService.encollageCPThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.ECPmtbfTY = data2;
                            this.ECPmtbf = this.ECPmtbfY.concat(this.ECPmtbfTY);
                            console.log('concat '+this.ECPmtbf);

                            for (let mach of this.ECPmtbf){
                                this.ECPmtbfByYear.labels.push(mach.date);
                                this.ECPmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.ECPmtbfByYear.datasets.push(mtbf);
        this.ECPmtbfByYear.datasets.push(tdt);
        this.ECPmtbfByYear.datasets.push(panne);

        this.ECPmdtByYear.datasets.push(wt);
        this.ECPmdtByYear.datasets.push(ttr);
        this.ECPmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  PonçagemtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.ponçageByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.POmtbfY = data1;
                    this.departementService.ponçageThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.POmtbfTY = data2;
                            this.POmtbf = this.POmtbfY.concat(this.POmtbfTY);
                            console.log('concat '+this.POmtbf);

                            for (let mach of this.POmtbf){
                                this.POmtbfByYear.labels.push(mach.date);
                                this.POmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.POmtbfByYear.datasets.push(mtbf);
        this.POmtbfByYear.datasets.push(tdt);
        this.POmtbfByYear.datasets.push(panne);

        this.POmdtByYear.datasets.push(wt);
        this.POmdtByYear.datasets.push(ttr);
        this.POmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

  PressagemtbfDep(){
        const mtbf = {
            data: [],
            label: "MTBF",
            yAxisID: 'y-axis-0',
            type: 'bar',
        };
        const mdt = {
            data: [],
            label: "MDT",
            yAxisID: 'y-axis-0',
            type: 'line',
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
            type: 'bar',
        };
        const wt = {
            data: [],
            label: "MWT",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };
        const ttr = {
            data: [],
            label: "MTTR",
            yAxisID: 'y-axis-1',
            type: 'bar',
        };

        const panne = {
            data: [],
            label: "Pannes",
            yAxisID: 'y-axis-1',
            type: 'line',
        };

        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
            this.departementService.pressageByYear(Number.parseInt(url)).subscribe(
                data1 => {
                    this.PRmtbfY = data1;
                    this.departementService.pressageThisYear(Number.parseInt(url)).subscribe(
                        data2 => {
                            this.PRmtbfTY = data2;
                            this.PRmtbf = this.PRmtbfY.concat(this.PRmtbfTY);
                            console.log('concat '+this.PRmtbf);

                            for (let mach of this.PRmtbf){
                                this.PRmtbfByYear.labels.push(mach.date);
                                this.PRmdtByYear.labels.push(mach.date);
                                test1.categories.push(mach.date);

                                // var x = mach.AT/60;
                                var y = mach.TDT/60;
                                // var z = mach.HT - (x+y);
                                var z = mach.HT - (y);


                                var a = Number.parseInt(mach.nbre.toString()) + 1 ;


                                var mt = z / a;
                                mtbf.data.push(Math.trunc(mt));

                                // mtbf.data.push(((mach.HT)-((Number.parseInt(mach.AT)/60)+(mach.TDT/60)))/(mach.nbre+1));
                                panne.data.push(mach.nbre);
                                tdt.data.push(mach.TDT);
                                ttr.data.push(Math.trunc(mach.TTR/mach.nbre));
                                wt.data.push(Math.trunc(mach.WT/mach.nbre));
                                mdt.data.push(Math.trunc(mach.TDT/mach.nbre));
                                teste.data.push(mach.nbre);

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
        });

        this.PRmtbfByYear.datasets.push(mtbf);
        this.PRmtbfByYear.datasets.push(tdt);
        this.PRmtbfByYear.datasets.push(panne);

        this.PRmdtByYear.datasets.push(wt);
        this.PRmdtByYear.datasets.push(ttr);
        this.PRmdtByYear.datasets.push(mdt);
        this.test.datasets.push(teste);
        // this.labs.categories.push(this.mtbfByYear.labels);
        // this.labs.categories.push(test1.categories)

    }

    // Paretos Placage

    paretoDerouleuseTDTRange(){
      this.DerouleuseparetoTDTMonth.datasets = [];
      this.DerouleuseparetoTDTMonth.labels = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoDerouleuseTDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.DerouleuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoDerouleuseTDTThysMonth(){
      this.DerouleuseparetoTDTMonth.datasets = [];
      this.DerouleuseparetoTDTMonth.labels = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
        this.departementService.paretoDerouleuseTDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.DerouleuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoDerouleuseTDTLastMonth(){
      this.DerouleuseparetoTDTMonth.datasets = [];
      this.DerouleuseparetoTDTMonth.labels = [];
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
        this.departementService.paretoDerouleuseTDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.DerouleuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoDerouleuseMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.DerouleuseparetoMDTMonth.datasets = [];
      this.DerouleuseparetoMDTMonth.labels = [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoDerouleuseMDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.DerouleuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoDerouleuseMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.DerouleuseparetoMDTMonth.datasets = [];
      this.DerouleuseparetoMDTMonth.labels = [];
        this.departementService.paretoDerouleuseMDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.DerouleuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoDerouleuseMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.DerouleuseparetoMDTMonth.datasets = [];
      this.DerouleuseparetoMDTMonth.labels = [];
        this.departementService.paretoDerouleuseMDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.DerouleuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    // ----------------------------------

    paretoBobineuseTDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.BobineuseparetoTDTMonth.datasets = [];
      this.BobineuseparetoTDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoBobineuseTDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.BobineuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoBobineuseTDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.BobineuseparetoTDTMonth.datasets = [];
      this.BobineuseparetoTDTMonth.labels= [];
        this.departementService.paretoBobineuseTDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.BobineuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoBobineuseTDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.BobineuseparetoTDTMonth.datasets = [];
      this.BobineuseparetoTDTMonth.labels= [];
        this.departementService.paretoBobineuseTDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.BobineuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoBobineuseMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };

      this.BobineuseparetoMDTMonth.datasets = [];
      this.BobineuseparetoMDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoBobineuseMDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.BobineuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoBobineuseMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.BobineuseparetoMDTMonth.datasets = [];
      this.BobineuseparetoMDTMonth.labels= [];
        this.departementService.paretoBobineuseMDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.BobineuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoBobineuseMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.BobineuseparetoMDTMonth.datasets = [];
      this.BobineuseparetoMDTMonth.labels= [];
        this.departementService.paretoBobineuseMDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.BobineuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    // ----------------------------------

    paretoMagasinBobineTDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MagBobineparetoTDTMonth.datasets = [];
      this.MagBobineparetoTDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoMagasinBobineTDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MagBobineparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMagasinBobineTDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MagBobineparetoTDTMonth.datasets = [];
      this.MagBobineparetoTDTMonth.labels= [];
        this.departementService.paretoMagasinBobineTDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MagBobineparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMagasinBobineTDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MagBobineparetoTDTMonth.datasets = [];
      this.MagBobineparetoTDTMonth.labels= [];
        this.departementService.paretoMagasinBobineTDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MagBobineparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMagasinBobineMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MagBobineparetoMDTMonth.datasets = [];
      this.MagBobineparetoMDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoMagasinBobineMDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MagBobineparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMagasinBobineMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MagBobineparetoMDTMonth.datasets = [];
      this.MagBobineparetoMDTMonth.labels= [];
        this.departementService.paretoMagasinBobineMDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MagBobineparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMagasinBobineMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MagBobineparetoMDTMonth.datasets = [];
      this.MagBobineparetoMDTMonth.labels= [];
        this.departementService.paretoMagasinBobineMDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MagBobineparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    // ----------------------------------

    paretoMassicotTDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };

      this.MassicotparetoTDTMonth.datasets = [];
      this.MassicotparetoTDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoMassicotTDTRange(d1,d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MassicotparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.MassicotparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMassicotTDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MassicotparetoTDTMonth.datasets = [];
      this.MassicotparetoTDTMonth.labels= [];
        this.departementService.paretoMassicotTDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MassicotparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.MassicotparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMassicotTDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MassicotparetoTDTMonth.datasets = [];
      this.MassicotparetoTDTMonth.labels= [];
        this.departementService.paretoMassicotTDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MassicotparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.MassicotparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMassicotMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.MassicotparetoMDTMonth.datasets = [];
      this.MassicotparetoMDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoMassicotMDTRange(d1,d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MassicotparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.MassicotparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMassicotMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };

      this.MassicotparetoMDTMonth.datasets = [];
      this.MassicotparetoMDTMonth.labels= [];
        this.departementService.paretoMassicotMDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MassicotparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.MassicotparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoMassicotMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };

      this.MassicotparetoMDTMonth.datasets = [];
      this.MassicotparetoMDTMonth.labels= [];
        this.departementService.paretoMassicotMDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MassicotparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.MassicotparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    // ----------------------------------

    paretoSechoirTDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.SechoirparetoTDTMonth.datasets = [];
      this.SechoirparetoTDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoSechoirTDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.SechoirparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.SechoirparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoSechoirTDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.SechoirparetoTDTMonth.datasets = [];
      this.SechoirparetoTDTMonth.labels= [];
        this.departementService.paretoSechoirTDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.SechoirparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.SechoirparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoSechoirTDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.SechoirparetoTDTMonth.datasets = [];
      this.SechoirparetoTDTMonth.labels= [];
        this.departementService.paretoSechoirTDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.SechoirparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.SechoirparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoSechoirMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.SechoirparetoMDTMonth.datasets = [];
      this.SechoirparetoMDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoSechoirMDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.SechoirparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.SechoirparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoSechoirMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.SechoirparetoMDTMonth.datasets = [];
      this.SechoirparetoMDTMonth.labels= [];
        this.departementService.paretoSechoirMDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.SechoirparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.SechoirparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoSechoirMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.SechoirparetoMDTMonth.datasets = [];
      this.SechoirparetoMDTMonth.labels= [];
        this.departementService.paretoSechoirMDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.SechoirparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.SechoirparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    // Paretos Brazil
    // ---------------------------------

    paretoTrancheuseTDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.TrancheuseparetoTDTMonth.datasets = [];
      this.TrancheuseparetoTDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoTrancheuseTDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.TrancheuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoTrancheuseTDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.TrancheuseparetoTDTMonth.datasets = [];
      this.TrancheuseparetoTDTMonth.labels= [];
        this.departementService.paretoTrancheuseTDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.TrancheuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoTrancheuseTDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.TrancheuseparetoTDTMonth.datasets = [];
      this.TrancheuseparetoTDTMonth.labels= [];
        this.departementService.paretoTrancheuseTDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.TrancheuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoTrancheuseMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.TrancheuseparetoMDTMonth.datasets = [];
      this.TrancheuseparetoMDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.departementService.paretoTrancheuseMDTRange(d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.TrancheuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoTrancheuseMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.TrancheuseparetoMDTMonth.datasets = [];
      this.TrancheuseparetoMDTMonth.labels= [];
        this.departementService.paretoTrancheuseMDTThisMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.TrancheuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoTrancheuseMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.TrancheuseparetoMDTMonth.datasets = [];
      this.TrancheuseparetoMDTMonth.labels= [];
        this.departementService.paretoTrancheuseMDTLastMonth().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.TrancheuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    // ---------------------------------

    paretoEncolleuseTDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.EncolleuseparetoTDTMonth.datasets = [];
      this.EncolleuseparetoTDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
        this.departementService.paretoEncolleuseTDTRange(Number.parseInt(url), d1, d2).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.EncolleuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
            });
        this.EncolleuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoEncolleuseTDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.EncolleuseparetoTDTMonth.datasets = [];
      this.EncolleuseparetoTDTMonth.labels= [];
        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
        this.departementService.paretoEncolleuseTDTThisMonth(Number.parseInt(url)).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.EncolleuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
            });
        this.EncolleuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoEncolleuseTDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.EncolleuseparetoTDTMonth.datasets = [];
      this.EncolleuseparetoTDTMonth.labels= [];
        this.route.params.subscribe(params =>{
          let url = atob(params['id']);
        this.departementService.paretoEncolleuseTDTLastMonth(Number.parseInt(url)).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.EncolleuseparetoTDTMonth.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
            });
        this.EncolleuseparetoTDTMonth.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoTDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoEncolleuseMDTRange(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.EncolleuseparetoMDTMonth.datasets = [];
      this.EncolleuseparetoMDTMonth.labels= [];
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
        this.route.params.subscribe(params => {
          let url = atob(params['id']);
            this.departementService.paretoEncolleuseMDTRange(Number.parseInt(url), d1, d2).subscribe(
                list => list.forEach(mach => {
                    // datasetNbrePanne2.name = (mach.machine);
                    this.EncolleuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                    datasetNbrePanne3.data.push(mach.nbre);
                    datasetNbrePanne4.data.push(mach.MDT);

                }));
        });
        this.EncolleuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoEncolleuseMDTThysMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.EncolleuseparetoMDTMonth.datasets = [];
      this.EncolleuseparetoMDTMonth.labels= [];
        this.route.params.subscribe(params => {
          let url = atob(params['id']);
            this.departementService.paretoEncolleuseMDTThisMonth(Number.parseInt(url)).subscribe(
                list => list.forEach(mach => {
                    // datasetNbrePanne2.name = (mach.machine);
                    this.EncolleuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                    datasetNbrePanne3.data.push(mach.nbre);
                    datasetNbrePanne4.data.push(mach.MDT);

                }));
        });
        this.EncolleuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    paretoEncolleuseMDTLastMonth(){
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Mean Down Time",
            yAxisID: 'y-axis-0',
            type: 'bar'
        };
      this.EncolleuseparetoMDTMonth.datasets = [];
      this.EncolleuseparetoMDTMonth.labels= [];
        this.route.params.subscribe(params => {
          let url = atob(params['id']);
            this.departementService.paretoEncolleuseMDTLastMonth(Number.parseInt(url)).subscribe(
                list => list.forEach(mach => {
                    // datasetNbrePanne2.name = (mach.machine);
                    this.EncolleuseparetoMDTMonth.labels.push(mach.nom.toUpperCase());
                    datasetNbrePanne3.data.push(mach.nbre);
                    datasetNbrePanne4.data.push(mach.MDT);

                }));
        });
        this.EncolleuseparetoMDTMonth.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoMDTMonth.datasets.push(datasetNbrePanne4);
    }

    showMachine(m: Machine){
      console.log('machine' + m.nom);
      let url = btoa(m.idM.toString());
      this.router.navigateByUrl("machines/"+url);
    }

  suiviJournalier($event){
    if (this.dashPanForm.controls['dashPeriode'].value == 'l30d'){
      // this.last30days();
      this.getChart3();
    }
    if (this.dashPanForm.controls['dashPeriode'].value == 'tmp'){
      const dat = new Date();
      var today = new Date();
      var tomorrow = new Date();
      tomorrow.setFullYear(today.getFullYear()-1);
      this.date_this_month = this.datePipe.transform(dat, 'MMMM yyyy');
      this.DashboardThisMonth();
      this.ThisMonthPannes();
      this.paretoThysMonth();
      this.paretoDerouleuseTDTThysMonth();
      this.paretoDerouleuseMDTThysMonth();
      this.paretoBobineuseTDTThysMonth();
      this.paretoBobineuseMDTThysMonth();
      this.paretoMagasinBobineTDTThysMonth();
      this.paretoMagasinBobineMDTThysMonth();
      this.paretoMassicotTDTThysMonth();
      this.paretoMassicotMDTThysMonth();
      this.paretoSechoirTDTThysMonth();
      this.paretoSechoirMDTThysMonth();
      this.paretoTrancheuseTDTThysMonth();
      this.paretoTrancheuseMDTThysMonth();
      this.paretoEncolleuseTDTThysMonth();
      this.paretoEncolleuseMDTThysMonth();
    }
    if (this.dashPanForm.controls['dashPeriode'].value == 'lmp'){
      const dat = new Date();
      const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMMM yyyy');
      console.log('last Month: '+ dat1);
      this.date_this_month = dat1;
      this.DashboardLastMonth();
      this.LastMonthPannes();
      this.paretoLastMonth();
      this.paretoDerouleuseTDTLastMonth();
      this.paretoDerouleuseMDTLastMonth();
      this.paretoBobineuseTDTLastMonth();
      this.paretoBobineuseMDTLastMonth();
      this.paretoMagasinBobineTDTLastMonth();
      this.paretoMagasinBobineMDTLastMonth();
      this.paretoMassicotTDTLastMonth();
      this.paretoMassicotMDTLastMonth();
      this.paretoSechoirTDTLastMonth();
      this.paretoSechoirMDTLastMonth();
      this.paretoTrancheuseTDTLastMonth();
      this.paretoTrancheuseMDTLastMonth();
      this.paretoEncolleuseTDTLastMonth();
      this.paretoEncolleuseMDTLastMonth();
    }
    if (this.dashPanForm.controls['dashPeriode'].value == 'pp'){
      this.ranges = "true";
    }
    else {
      this.ranges = "false";
    }
  }

  findSso($event){
    if (this.selectPanForm.controls['periode'].value == 'hp'){
      this.HierPannes();
    }
    if (this.selectPanForm.controls['periode'].value == 'ttesp'){
      this.showPannesDep();
      // this.countAllPannes();
    }
    if (this.selectPanForm.controls['periode'].value == 'tp'){
      this.TodayPannes();
      // this.countTodayPannes();
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

  decimal(x: number){
    if (Number.isInteger(x)) {
      return true;
    }
    return false;
  }
}
