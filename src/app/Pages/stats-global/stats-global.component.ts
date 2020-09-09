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


@Component({
  selector: 'app-stats-global',
  templateUrl: './stats-global.component.html',
  styleUrls: ['./stats-global.component.css']
})
export class StatsGlobalComponent implements OnInit {
  headings = 'Statistiques Alpicam';
  subheadings = 'Découvrez les données statistiques de l\'entreprise ';
  icons = 'pe-7s-graph icon-gradient bg-royal';

  dashPanForm: FormGroup;
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

  // public yaxis = [
  //   // {
  //   //   axisBorder:{
  //   //     show: true,
  //   //     color: "#008FFB"
  //   //   },
  //   //   labels: {
  //   //     style: {
  //   //       color: "#008FFB"
  //   //     }
  //   //   },
  //   //   title: {
  //   //     text: "Nombre de pannes",
  //   //     style: {
  //   //       color: "#008FFB"
  //   //     }
  //   //   }
  //   // }
  // ];
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


  AlpicamLastYearNumber: number;
  AlpicamLastYearTDT: number;
  AlpicamLastYearMDT: number;
  AlpicamLastYearDate: string;

  AlpicamThisYearNumber: number;
  AlpicamThisYearTDT: number;
  AlpicamThisYearMDT: number;
  AlpicamThisYearDate: string;

  PlacageLastYearNumber: number;
  PlacageLastYearTDT: number;
  PlacageLastYearMDT: number;
  PlacageLastYearDate: string;

  PlacageThisYearNumber: number;
  PlacageThisYearTDT: number;
  PlacageThisYearMDT: number;
  PlacageThisYearDate: string;

  BrazilLastYearNumber: number;
  BrazilLastYearTDT: number;
  BrazilLastYearMDT: number;
  BrazilLastYearDate: string;

  BrazilThisYearNumber: number;
  BrazilThisYearTDT: number;
  BrazilThisYearMDT: number;
  BrazilThisYearDate: string;

  CPLastYearNumber: number;
  CPLastYearTDT: number;
  CPLastYearMDT: number;
  CPLastYearDate: string;

  CPThisYearNumber: number;
  CPThisYearTDT: number;
  CPThisYearMDT: number;
  CPThisYearDate: string;

  ScierieLastYearNumber: number;
  ScierieLastYearTDT: number;
  ScierieLastYearMDT: number;
  ScierieLastYearDate: string;

  ScierieThisYearNumber: number;
  ScierieThisYearTDT: number;
  ScierieThisYearMDT: number;
  ScierieThisYearDate: string;

  JointageLastYearNumber: number;
  JointageLastYearTDT: number;
  JointageLastYearMDT: number;
  JointageLastYearDate: string;

  JointageThisYearNumber: number;
  JointageThisYearTDT: number;
  JointageThisYearMDT: number;
  JointageThisYearDate: string;

  SechoirEz1LastYearNumber: number;
  SechoirEz2LastYearNumber: number;
  SechoirEz3LastYearNumber: number;
  SechoirENLastYearNumber: number;
  SechoirEz4LastYearNumber: number;
  SechoirER24LastYearNumber: number;
  SechoirEz1LastYearTDT: number;
  SechoirEz2LastYearTDT: number;
  SechoirEz3LastYearTDT: number;
  SechoirENLastYearTDT: number;
  SechoirEz4LastYearTDT: number;
  SechoirER24LastYearTDT: number;
  SechoirEz1LastYearMDT: number;
  SechoirEz2LastYearMDT: number;
  SechoirEz3LastYearMDT: number;
  SechoirENLastYearMDT: number;
  SechoirEz4LastYearMDT: number;
  SechoirER24LastYearMDT: number;
  SechoirEz1LastYearDate: string;
  SechoirEz2LastYearDate: string;
  SechoirEz3LastYearDate: string;
  SechoirENLastYearDate: string;
  SechoirEz4LastYearDate: string;
  SechoirER24LastYearDate: string;

  SechoirEz1ThisYearNumber: number;
  SechoirEz2ThisYearNumber: number;
  SechoirEz3ThisYearNumber: number;
  SechoirENThisYearNumber: number;
  SechoirEz4ThisYearNumber: number;
  SechoirER24ThisYearNumber: number;
  SechoirEz1ThisYearTDT: number;
  SechoirEz2ThisYearTDT: number;
  SechoirEz3ThisYearTDT: number;
  SechoirENThisYearTDT: number;
  SechoirEz4ThisYearTDT: number;
  SechoirER24ThisYearTDT: number;
  SechoirEz1ThisYearMDT: number;
  SechoirEz2ThisYearMDT: number;
  SechoirEz3ThisYearMDT: number;
  SechoirENThisYearMDT: number;
  SechoirEz4ThisYearMDT: number;
  SechoirER24ThisYearMDT: number;
  SechoirEz1ThisYearDate: string;
  SechoirEz2ThisYearDate: string;
  SechoirEz3ThisYearDate: string;
  SechoirENThisYearDate: string;
  SechoirEz4ThisYearDate: string;
  SechoirER24ThisYearDate: string;

  Derouleuse1LastYearNumber: number;
  Derouleuse2LastYearNumber: number;
  Derouleuse3LastYearNumber: number;
  Derouleuse1LastYearTDT: number;
  Derouleuse2LastYearTDT: number;
  Derouleuse3LastYearTDT: number;
  Derouleuse1LastYearMDT: number;
  Derouleuse2LastYearMDT: number;
  Derouleuse3LastYearMDT: number;
  Derouleuse1LastYearDate: string;
  Derouleuse2LastYearDate: string;
  Derouleuse3LastYearDate: string;

  Derouleuse1ThisYearNumber: number;
  Derouleuse2ThisYearNumber: number;
  Derouleuse3ThisYearNumber: number;
  Derouleuse1ThisYearTDT: number;
  Derouleuse2ThisYearTDT: number;
  Derouleuse3ThisYearTDT: number;
  Derouleuse1ThisYearMDT: number;
  Derouleuse2ThisYearMDT: number;
  Derouleuse3ThisYearMDT: number;
  Derouleuse1ThisYearDate: string;
  Derouleuse2ThisYearDate: string;
  Derouleuse3ThisYearDate: string;


  Bobineuse1LastYearNumber: number;
  Bobineuse2LastYearNumber: number;
  Bobineuse3LastYearNumber: number;
  Bobineuse1LastYearTDT: number;
  Bobineuse2LastYearTDT: number;
  Bobineuse3LastYearTDT: number;
  Bobineuse1LastYearMDT: number;
  Bobineuse2LastYearMDT: number;
  Bobineuse3LastYearMDT: number;
  Bobineuse1LastYearDate: string;
  Bobineuse2LastYearDate: string;
  Bobineuse3LastYearDate: string;

  Bobineuse1ThisYearNumber: number;
  Bobineuse2ThisYearNumber: number;
  Bobineuse3ThisYearNumber: number;
  Bobineuse1ThisYearTDT: number;
  Bobineuse2ThisYearTDT: number;
  Bobineuse3ThisYearTDT: number;
  Bobineuse1ThisYearMDT: number;
  Bobineuse2ThisYearMDT: number;
  Bobineuse3ThisYearMDT: number;
  Bobineuse1ThisYearDate: string;
  Bobineuse2ThisYearDate: string;
  Bobineuse3ThisYearDate: string;

  MagBobine1LastYearNumber: number;
  MagBobine2LastYearNumber: number;
  MagBobine3LastYearNumber: number;
  MagBobine1LastYearTDT: number;
  MagBobine2LastYearTDT: number;
  MagBobine3LastYearTDT: number;
  MagBobine1LastYearMDT: number;
  MagBobine2LastYearMDT: number;
  MagBobine3LastYearMDT: number;
  MagBobine1LastYearDate: string;
  MagBobine2LastYearDate: string;
  MagBobine3LastYearDate: string;

  MagBobine1ThisYearNumber: number;
  MagBobine2ThisYearNumber: number;
  MagBobine3ThisYearNumber: number;
  MagBobine1ThisYearTDT: number;
  MagBobine2ThisYearTDT: number;
  MagBobine3ThisYearTDT: number;
  MagBobine1ThisYearMDT: number;
  MagBobine2ThisYearMDT: number;
  MagBobine3ThisYearMDT: number;
  MagBobine1ThisYearDate: string;
  MagBobine2ThisYearDate: string;
  MagBobine3ThisYearDate: string;

  TapisDechetsLastYearNumber: number;
  TapisDechetsLastYearTDT: number;
  TapisDechetsLastYearMDT: number;
  TapisDechetsLastYearDate: string;

  TapisDechetsThisYearNumber: number;
  TapisDechetsThisYearTDT: number;
  TapisDechetsThisYearMDT: number;
  TapisDechetsThisYearDate: string;

  PresseTeteLastYearNumber: number;
  PresseTeteLastYearTDT: number;
  PresseTeteLastYearMDT: number;
  PresseTeteLastYearDate: string;

  PresseTeteThisYearNumber: number;
  PresseTeteThisYearTDT: number;
  PresseTeteThisYearMDT: number;
  PresseTeteThisYearDate: string;

  PresseSimiLastYearNumber: number;
  PresseSimiLastYearTDT: number;
  PresseSimiLastYearMDT: number;
  PresseSimiLastYearDate: string;

  PresseSimiThisYearNumber: number;
  PresseSimiThisYearTDT: number;
  PresseSimiThisYearMDT: number;
  PresseSimiThisYearDate: string;

  Trancheuse1LastYearNumber: number;
  Trancheuse2LastYearNumber: number;
  Trancheuse1LastYearTDT: number;
  Trancheuse2LastYearTDT: number;
  Trancheuse1LastYearMDT: number;
  Trancheuse2LastYearMDT: number;
  Trancheuse1LastYearDate: string;
  Trancheuse2LastYearDate: string;

  Trancheuse1ThisYearNumber: number;
  Trancheuse2ThisYearNumber: number;
  Trancheuse1ThisYearTDT: number;
  Trancheuse2ThisYearTDT: number;
  Trancheuse1ThisYearMDT: number;
  Trancheuse2ThisYearMDT: number;
  Trancheuse1ThisYearDate: string;
  Trancheuse2ThisYearDate: string;

  EcorcageLastYearNumber: number;
  EcorcageLastYearTDT: number;
  EcorcageLastYearMDT: number;
  EcorcageLastYearDate: string;

  EcorcageThisYearNumber: number;
  EcorcageThisYearTDT: number;
  EcorcageThisYearMDT: number;
  EcorcageThisYearDate: string;

  ScieBongioaniLastYearNumber: number;
  ScieBongioaniLastYearTDT: number;
  ScieBongioaniLastYearMDT: number;
  ScieBongioaniLastYearDate: string;

  ScieBongioaniThisYearNumber: number;
  ScieBongioaniThisYearTDT: number;
  ScieBongioaniThisYearMDT: number;
  ScieBongioaniThisYearDate: string;

  Encolleuse1BrazilLastYearNumber: number;
  Encolleuse2BrazilLastYearNumber: number;
  Encolleuse3BrazilLastYearNumber: number;
  Encolleuse1PagnioniLastYearNumber: number;
  Encolleuse2PagnioniLastYearNumber: number;
  Encolleuse3SimiLastYearNumber: number;
  Encolleuse1BrazilLastYearTDT: number;
  Encolleuse2BrazilLastYearTDT: number;
  Encolleuse3BrazilLastYearTDT: number;
  Encolleuse1PagnioniLastYearTDT: number;
  Encolleuse2PagnioniLastYearTDT: number;
  Encolleuse3SimiLastYearTDT: number;
  Encolleuse1BrazilLastYearMDT: number;
  Encolleuse2BrazilLastYearMDT: number;
  Encolleuse3BrazilLastYearMDT: number;
  Encolleuse1PagnioniLastYearMDT: number;
  Encolleuse2PagnioniLastYearMDT: number;
  Encolleuse3SimiLastYearMDT: number;
  Encolleuse1BrazilLastYearDate: string;
  Encolleuse2BrazilLastYearDate: string;
  Encolleuse3BrazilLastYearDate: string;
  Encolleuse1PagnioniLastYearDate: string;
  Encolleuse2PagnioniLastYearDate: string;
  Encolleuse3SimiLastYearDate: string;

  Encolleuse1BrazilThisYearNumber: number;
  Encolleuse2BrazilThisYearNumber: number;
  Encolleuse3BrazilThisYearNumber: number;
  Encolleuse1PagnioniThisYearNumber: number;
  Encolleuse2PagnioniThisYearNumber: number;
  Encolleuse3SimiThisYearNumber: number;
  Encolleuse1BrazilThisYearTDT: number;
  Encolleuse2BrazilThisYearTDT: number;
  Encolleuse3BrazilThisYearTDT: number;
  Encolleuse1PagnioniThisYearTDT: number;
  Encolleuse2PagnioniThisYearTDT: number;
  Encolleuse3SimiThisYearTDT: number;
  Encolleuse1BrazilThisYearMDT: number;
  Encolleuse2BrazilThisYearMDT: number;
  Encolleuse3BrazilThisYearMDT: number;
  Encolleuse1PagnioniThisYearMDT: number;
  Encolleuse2PagnioniThisYearMDT: number;
  Encolleuse3SimiThisYearMDT: number;
  Encolleuse1BrazilThisYearDate: string;
  Encolleuse2BrazilThisYearDate: string;
  Encolleuse3BrazilThisYearDate: string;
  Encolleuse1PagnioniThisYearDate: string;
  Encolleuse2PagnioniThisYearDate: string;
  Encolleuse3SimiThisYearDate: string;

  Ligne1LastYearNumber: number;
  Ligne2LastYearNumber: number;
  Ligne3LastYearNumber: number;
  SechoirsLastYearNumber: number;
  EncollageBrazilLastYearNumber: number;
  EncollageCPLastYearNumber: number;
  TranchageLastYearNumber: number;
  Ligne1LastYearTDT: number;
  Ligne2LastYearTDT: number;
  Ligne3LastYearTDT: number;
  SechoirsLastYearTDT: number;
  EncollageBrazilLastYearTDT: number;
  EncollageCPLastYearTDT: number;
  TranchageLastYearTDT: number;
  Ligne1LastYearMDT: number;
  Ligne2LastYearMDT: number;
  Ligne3LastYearMDT: number;
  SechoirsLastYearMDT: number;
  EncollageBrazilLastYearMDT: number;
  EncollageCPLastYearMDT: number;
  TranchageLastYearMDT: number;
  Ligne1LastYearDate: string;
  Ligne2LastYearDate: string;
  Ligne3LastYearDate: string;
  SechoirsLastYearDate: string;
  EncollageBrazilLastYearDate: string;
  EncollageCPLastYearDate: string;
  TranchageLastYearDate: string;

  Ligne1ThisYearNumber: number;
  Ligne2ThisYearNumber: number;
  Ligne3ThisYearNumber: number;
  SechoirsThisYearNumber: number;
  EncollageBrazilThisYearNumber: number;
  EncollageCPThisYearNumber: number;
  TranchageThisYearNumber: number;
  Ligne1ThisYearTDT: number;
  Ligne2ThisYearTDT: number;
  Ligne3ThisYearTDT: number;
  SechoirsThisYearTDT: number;
  EncollageBrazilThisYearTDT: number;
  EncollageCPThisYearTDT: number;
  TranchageThisYearTDT: number;
  Ligne1ThisYearMDT: number;
  Ligne2ThisYearMDT: number;
  Ligne3ThisYearMDT: number;
  SechoirsThisYearMDT: number;
  EncollageBrazilThisYearMDT: number;
  EncollageCPThisYearMDT: number;
  TranchageThisYearMDT: number;
  Ligne1ThisYearDate: string;
  Ligne2ThisYearDate: string;
  Ligne3ThisYearDate: string;
  SechoirsThisYearDate: string;
  EncollageBrazilThisYearDate: string;
  EncollageCPThisYearDate: string;
  TranchageThisYearDate: string;

  series: any[];
  date_last_month: any;
  date_this_month: any;
  date_this_months: any;
  // labels = ['2f', '4g', 'E+'];


  MassEZ1LastYearNumber: number;
  MassENLastYearNumber: number;
  MassEZ3LastYearNumber: number;
  MassEZ4LastYearNumber: number;
  MassALastYearNumber: number;
  MassBLastYearNumber: number;
  MassEZ1LastYearTDT: number;
  MassENLastYearTDT: number;
  MassEZ3LastYearTDT: number;
  MassEZ4LastYearTDT: number;
  MassALastYearTDT: number;
  MassBLastYearTDT: number;
  MassEZ1LastYearMDT: number;
  MassENLastYearMDT: number;
  MassEZ3LastYearMDT: number;
  MassEZ4LastYearMDT: number;
  MassALastYearMDT: number;
  MassBLastYearMDT: number;
  MassEZ1LastYearDate: string;
  MassENLastYearDate: string;
  MassEZ3LastYearDate: string;
  MassEZ4LastYearDate: string;
  MassALastYearDate: string;
  MassBLastYearDate: string;

  MassEZ1ThisYearNumber: number;
  MassENThisYearNumber: number;
  MassEZ3ThisYearNumber: number;
  MassEZ4ThisYearNumber: number;
  MassAThisYearNumber: number;
  MassBThisYearNumber: number;
  MassEZ1ThisYearTDT: number;
  MassENThisYearTDT: number;
  MassEZ3ThisYearTDT: number;
  MassEZ4ThisYearTDT: number;
  MassAThisYearTDT: number;
  MassBThisYearTDT: number;
  MassEZ1ThisYearMDT: number;
  MassENThisYearMDT: number;
  MassEZ3ThisYearMDT: number;
  MassEZ4ThisYearMDT: number;
  MassAThisYearMDT: number;
  MassBThisYearMDT: number;
  MassEZ1ThisYearDate: string;
  MassENThisYearDate: string;
  MassEZ3ThisYearDate: string;
  MassEZ4ThisYearDate: string;
  MassAThisYearDate: string;
  MassBThisYearDate: string;
  private rangeForm: FormGroup;
  private ranges: string = 'false';

  constructor(private dashboardService: DashboardService,
              private datePipe: DatePipe,
              private router: Router,
              private fb: FormBuilder,
              private departementService: DepartementsService,
              private alpicamService: AlpicamService) {
    this.dashForm();
    this.rangeForms();
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

  ngOnInit() {
    this.mdtAlpicam();
    this.mtbfAlpicam();
    this.radialBar();
    this.paretoAlpiThisMonth();
    this.typePanneThisMonth();
    this.loadDepartements();
    this.alpiStats();
    this.alpiStats2();

    this.brazilStats();
    this.brazilStats2();

    this.placageStats();
    this.placageStats2();

    this.scierieStats();
    this.scierieStats2();

    this.ligne1Stats();
    this.ligne1Stats2();

    this.ligne2Stats();
    this.ligne2Stats2();

    this.ligne3Stats();
    this.ligne3Stats2();

    this.sechoirsStats();
    this.sechoirsStats2();

    this.jointageStats();
    this.jointageStats2();

    this.ecorçageStats();
    this.ecorçageStats2();

    this.tapisDechetsStats();
    this.tapisDechetsStats2();

    this.encollageBrazilStats();
    this.encollageBrazilStats2();

    this.tranchageStats();
    this.tranchageStats2();

    this.derouleuse1Stats();
    this.derouleuse1Stats2();

    this.derouleuse2Stats();
    this.derouleuse2Stats2();

    this.derouleuse3Stats();
    this.derouleuse3Stats2();

    this.bobineuse1Stats();
    this.bobineuse1Stats2();

    this.bobineuse2Stats();
    this.bobineuse2Stats2();

    this.bobineuse3Stats();
    this.bobineuse3Stats2();

    this.magbob1Stats();
    this.magbob1Stats2();

    this.magbob2Stats();
    this.magbob2Stats2();

    this.magbob3Stats();
    this.magbob3Stats2();

    this.massEZ1Stats();
    this.massEZ1Stats2();

    this.massEZ3Stats();
    this.massEZ3Stats2();

    this.massEZ4Stats();
    this.massEZ4Stats2();

    this.massENStats();
    this.massENStats2();

    this.massAStats();
    this.massAStats2();

    this.massBStats();
    this.massBStats2();

    this.sechENStats();
    this.sechENStats2();

    this.sechEZ1Stats();
    this.sechEZ1Stats2();

    this.sechEZ2Stats();
    this.sechEZ2Stats2();

    this.sechEZ3Stats();
    this.sechEZ3Stats2();

    this.sechEZ4Stats();
    this.sechEZ4Stats2();

    this.sechER24Stats();
    this.sechER24Stats2();

    this.encolleuse1BrazilStats();
    this.encolleuse1BrazilStats2();

    this.encolleuse2BrazilStats();
    this.encolleuse2BrazilStats2();

    this.encolleuse3BrazilStats();
    this.encolleuse3BrazilStats2();

    this.encolleuse1CPStats();
    this.encolleuse1CPStats2();

    this.encolleuse2CPStats();
    this.encolleuse2CPStats2();

    this.encolleuse3CPStats();
    this.encolleuse3CPStats2();

    this.scieBongStats();
    this.scieBongStats2();

    this.presseTeteStats();
    this.presseTeteStats2();

    this.presseSimiStats();
    this.presseSimiStats2();

    this.trancheuse1Stats();
    this.trancheuse1Stats2();

    this.trancheuse2Stats();
    this.trancheuse2Stats2();

    this.cpStats();
    this.cpStats2();

    const dat = new Date();
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setFullYear(today.getFullYear()-1);
    this.date_this_month = dat;
    this.date_last_month = tomorrow;
    this.date_this_months = this.datePipe.transform(dat, 'MMMM yyyy');

    this.statsPanne();

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
                    teste2.data.push(Math.trunc(mt));
                  }



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
    // this.test.datasets.push(teste2);
    // this.test.datasets.push(teste1);
    // this.test.datasets.push(teste);

    this.mdtByYear.datasets.push(wt);
    this.mdtByYear.datasets.push(ttr);
    this.mdtByYear.datasets.push(mdt);
    // this.labs.categories.push(this.mtbfByYear.labels);
    // this.labs.categories.push(test1.categories)

  }

  radialBar(){
    //
    // this.dashboardService.getCountDepPannes().subscribe(
    //
    //     data => {
    //       this.cdpannes = data;
    //       var x = 0;
    //       for (let pin of this.cdpannes){
    //         x = x + pin.nbre;
    //       }
    //       var options = {
    //         chart: {
    //           height: 350,
    //           type: "radialBar",
    //           toolbar: {
    //             show: true
    //           }
    //         },
    //
    //         series: [x],
    //
    //         plotOptions: {
    //           radialBar: {
    //             startAngle: -135,
    //             endAngle: 225,
    //             hollow: {
    //               margin: 0,
    //               size: "70%",
    //               background: "#fff",
    //               position: 'front',
    //               dropShadow: {
    //                 enabled: true,
    //                 top: 3,
    //                 left: 0,
    //                 blur: 4,
    //                 opacity: 0.24
    //               }
    //             },
    //             track: {
    //               background: '#fff',
    //               strokeWidth: '67%',
    //               margin: 0,
    //               dropShadow: {
    //                 enabled: true,
    //                 top: -3,
    //                 left: 0,
    //                 blur: 4,
    //                 opacity: 0.35
    //               }
    //             },
    //             dataLabels: {
    //               show: true,
    //               name: {
    //                 offsetY: -10,
    //                 color: "#888",
    //                 fontSize: "17px"
    //               },
    //               value: {
    //                 color: "#111",
    //                 fontSize: "36px",
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
    //             shadeIntensity: 0.5,
    //             gradientToColors: ["#ABE5A1"],
    //             stops: [0, 100],
    //             inverseColors: true,
    //             opacityFrom: 1,
    //             opacityTo: 1,
    //           }
    //         },
    //         stroke: {
    //           lineCap: "round"
    //         },
    //         labels: ["Total Pannes"]
    //       };
    //
    //       var chart = new ApexCharts(document.querySelector("#chart"), options);
    //
    //       chart.render();
    //
    //     },
    //     error => {
    //       console.log('une erreur a été détectée!')
    //     },
    //     () => {
    //       console.log('Total');
    //       console.log(this.cdount);
    //     }
    // );
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
          this.datas.labels.push(mach.nom);
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
          this.datas.labels.push(mach.nom);
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
          this.datas.labels.push(mach.nom);
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        } )) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);
  }

  statsPanne(){
    this.alpicamService.getRecapPanne().subscribe(
        list => {
          this.stats = list;
        }
    );
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

  alpiStats(){

    this.alpicamService.alpiThisYear().subscribe(
        data => {
          this.series = data;
          console.log('alpiStats '+data);
          for (let mach of data){
            this.AlpicamThisYearDate = mach.date;
            this.AlpicamThisYearNumber = mach.nbre;
            this.AlpicamThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.AlpicamThisYearMDT = 0;
            } else {
              this.AlpicamThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  alpiStats2(){

    this.alpicamService.alpiLastYear().subscribe(
        list => list.forEach(machs => {
          // this.alpiLY = datas
          // for (let mach of datas) {
          console.log('last year alpi: '+ machs.date);
            this.AlpicamLastYearDate = machs.date;
            this.AlpicamLastYearNumber = machs.nbre;
            this.AlpicamLastYearTDT = machs.TDT;
            if (machs.TDT == 0 && machs.nbre == 0) {
              this.AlpicamLastYearMDT = 0;
            } else {
              this.AlpicamLastYearMDT = machs.TDT / machs.nbre;
            }
          // }
        })
    );
  }

  placageStats(){
    this.alpicamService.placageThisYear().subscribe(
        list => list.forEach(mache => {
          this.PlacageThisYearDate = mache.date;
          this.PlacageThisYearNumber = mache.nbre;
          this.PlacageThisYearTDT = mache.TDT;
          if (mache.nbre == 0) {
            this.PlacageThisYearMDT = 0;
          } else {
            this.PlacageThisYearMDT = mache.TDT / mache.nbre;
          }

        })
    );
  }
  placageStats2(){

    this.alpicamService.placageLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let macher of datas) {
            this.PlacageLastYearDate = macher.date;
            this.PlacageLastYearNumber = macher.nbre;
            this.PlacageLastYearTDT = macher.TDT;
            if (macher.nbre == 0) {
              this.PlacageLastYearMDT = 0;
            } else {
              this.PlacageLastYearMDT = macher.TDT / macher.nbre;
            }
          }
        }
    );
  }

  brazilStats(){
    this.alpicamService.brazilThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.BrazilThisYearDate = data[0].date;
            this.BrazilThisYearNumber = mach.nbre;
            this.BrazilThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.BrazilThisYearMDT = 0;
            } else {
              this.BrazilThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  brazilStats2(){

    this.alpicamService.brazilLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          this.BrazilLastYearDate = datas[0].date;
          for (let mach of datas) {

            this.BrazilLastYearNumber = mach.nbre;
            this.BrazilLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.BrazilLastYearMDT = 0;
            } else {
              this.BrazilLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  scierieStats(){
    this.alpicamService.scierieThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.ScierieThisYearDate = data[0].date;
            this.ScierieThisYearNumber = mach.nbre;
            this.ScierieThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.ScierieThisYearMDT = 0;
            } else {
              this.ScierieThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  scierieStats2(){

    this.alpicamService.scierieLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.ScierieLastYearDate = datas[0].date;
            this.ScierieLastYearNumber = mach.nbre;
            this.ScierieLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.ScierieLastYearMDT = 0;
            } else {
              this.ScierieLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  // on passe maintenant aux lignes
  ligne1Stats(){
    this.alpicamService.ligne1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Ligne1ThisYearDate = data[0].date;
            this.Ligne1ThisYearNumber = mach.nbre;
            this.Ligne1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Ligne1ThisYearMDT = 0;
            } else {
              this.Ligne1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  ligne1Stats2(){

    this.alpicamService.ligne1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Ligne1LastYearDate = datas[0].date;
            this.Ligne1LastYearNumber = mach.nbre;
            this.Ligne1LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Ligne1LastYearMDT = 0;
            } else {
              this.Ligne1LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  ligne2Stats(){
    this.alpicamService.ligne2ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Ligne2ThisYearDate = data[0].date;
            this.Ligne2ThisYearNumber = mach.nbre;
            this.Ligne2ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Ligne2ThisYearMDT = 0;
            } else {
              this.Ligne2ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  ligne2Stats2(){
    this.alpicamService.ligne2LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Ligne2LastYearDate = datas[0].date;
            this.Ligne2LastYearNumber = mach.nbre;
            this.Ligne2LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Ligne2LastYearMDT = 0;
            } else {
              this.Ligne2LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  ligne3Stats(){
    this.alpicamService.ligne3ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Ligne3ThisYearDate = data[0].date;
            this.Ligne3ThisYearNumber = mach.nbre;
            this.Ligne3ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Ligne3ThisYearMDT = 0;
            } else {
              this.Ligne3ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  ligne3Stats2(){
    this.alpicamService.ligne3LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Ligne3LastYearDate = datas[0].date;
            this.Ligne3LastYearNumber = mach.nbre;
            this.Ligne3LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Ligne3LastYearMDT = 0;
            } else {
              this.Ligne3LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechoirsStats(){
    this.alpicamService.sechoirsThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirsThisYearDate = data[0].date;
            this.SechoirsThisYearNumber = mach.nbre;
            this.SechoirsThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirsThisYearMDT = 0;
            } else {
              this.SechoirsThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechoirsStats2(){
    this.alpicamService.sechoirsLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirsLastYearDate = datas[0].date;
            this.SechoirsLastYearNumber = mach.nbre;
            this.SechoirsLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirsLastYearMDT = 0;
            } else {
              this.SechoirsLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  jointageStats(){
    this.alpicamService.jointageThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.JointageThisYearDate = data[0].date;
            this.JointageThisYearNumber = mach.nbre;
            this.JointageThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.JointageThisYearMDT = 0;
            } else {
              this.JointageThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  jointageStats2(){
    this.alpicamService.jointageLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.JointageLastYearDate = datas[0].date;
            this.JointageLastYearNumber = mach.nbre;
            this.JointageLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.JointageLastYearMDT = 0;
            } else {
              this.JointageLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  ecorçageStats(){
    this.alpicamService.ecorçageThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.EcorcageThisYearDate = data[0].date;
            this.EcorcageThisYearNumber = mach.nbre;
            this.EcorcageThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.EcorcageThisYearMDT = 0;
            } else {
              this.EcorcageThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  ecorçageStats2(){
    this.alpicamService.ecorçageLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.EcorcageLastYearDate = datas[0].date;
            this.EcorcageLastYearNumber = mach.nbre;
            this.EcorcageLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.EcorcageLastYearMDT = 0;
            } else {
              this.EcorcageLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  tapisDechetsStats(){
    this.alpicamService.tapisDechetsThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.TapisDechetsThisYearDate = data[0].date;
            this.TapisDechetsThisYearNumber = mach.nbre;
            this.TapisDechetsThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.TapisDechetsThisYearMDT = 0;
            } else {
              this.TapisDechetsThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  tapisDechetsStats2(){
    this.alpicamService.tapisDechetsLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.TapisDechetsLastYearDate = datas[0].date;
            this.TapisDechetsLastYearNumber = mach.nbre;
            this.TapisDechetsLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.TapisDechetsLastYearMDT = 0;
            } else {
              this.TapisDechetsLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encollageBrazilStats(){
    this.alpicamService.encollageBrazilThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.EncollageBrazilThisYearDate = data[0].date;
            this.EncollageBrazilThisYearNumber = mach.nbre;
            this.EncollageBrazilThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.EncollageBrazilThisYearMDT = 0;
            } else {
              this.EncollageBrazilThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encollageBrazilStats2(){
    this.alpicamService.encollageBrazilLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.EncollageBrazilLastYearDate = datas[0].date;
            this.EncollageBrazilLastYearNumber = mach.nbre;
            this.EncollageBrazilLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.EncollageBrazilLastYearMDT = 0;
            } else {
              this.EncollageBrazilLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  derouleuse1Stats(){
    this.alpicamService.derouleuse1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Derouleuse1ThisYearDate = data[0].date;
            this.Derouleuse1ThisYearNumber = mach.nbre;
            this.Derouleuse1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Derouleuse1ThisYearMDT = 0;
            } else {
              this.Derouleuse1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  derouleuse1Stats2(){
    this.alpicamService.derouleuse1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Derouleuse1LastYearDate = datas[0].date;
            this.Derouleuse1LastYearNumber = mach.nbre;
            this.Derouleuse1LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Derouleuse1LastYearMDT = 0;
            } else {
              this.Derouleuse1LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  derouleuse2Stats(){
    this.alpicamService.derouleuse2ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Derouleuse2ThisYearDate = data[0].date;
            this.Derouleuse2ThisYearNumber = mach.nbre;
            this.Derouleuse2ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Derouleuse2ThisYearMDT = 0;
            } else {
              this.Derouleuse2ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  derouleuse2Stats2(){
    this.alpicamService.derouleuse2LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Derouleuse2LastYearDate = datas[0].date;
            this.Derouleuse2LastYearNumber = mach.nbre;
            this.Derouleuse2LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Derouleuse2LastYearMDT = 0;
            } else {
              this.Derouleuse2LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  derouleuse3Stats(){
    this.alpicamService.derouleuse3ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Derouleuse3ThisYearDate = data[0].date;
            this.Derouleuse3ThisYearNumber = mach.nbre;
            this.Derouleuse3ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Derouleuse3ThisYearMDT = 0;
            } else {
              this.Derouleuse3ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  derouleuse3Stats2(){
    this.alpicamService.derouleuse3LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Derouleuse3LastYearDate = datas[0].date;
            this.Derouleuse3LastYearNumber = mach.nbre;
            this.Derouleuse3LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Derouleuse3LastYearMDT = 0;
            } else {
              this.Derouleuse3LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  bobineuse1Stats(){
    this.alpicamService.bobineuse1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Bobineuse1ThisYearDate = data[0].date;
            this.Bobineuse1ThisYearNumber = mach.nbre;
            this.Bobineuse1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Bobineuse1ThisYearMDT = 0;
            } else {
              this.Bobineuse1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  bobineuse1Stats2(){
    this.alpicamService.bobineuse1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Bobineuse1LastYearDate = datas[0].date;
            this.Bobineuse1LastYearNumber = mach.nbre;
            this.Bobineuse1LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Bobineuse1LastYearMDT = 0;
            } else {
              this.Bobineuse1LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  bobineuse2Stats(){
    this.alpicamService.bobineuse2ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Bobineuse2ThisYearDate = data[0].date;
            this.Bobineuse2ThisYearNumber = mach.nbre;
            this.Bobineuse2ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Bobineuse2ThisYearMDT = 0;
            } else {
              this.Bobineuse2ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  bobineuse2Stats2(){
    this.alpicamService.bobineuse2LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Bobineuse2LastYearDate = datas[0].date;
            this.Bobineuse2LastYearNumber = mach.nbre;
            this.Bobineuse2LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Bobineuse2LastYearMDT = 0;
            } else {
              this.Bobineuse2LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  bobineuse3Stats(){
    this.alpicamService.bobineuse3ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Bobineuse3ThisYearDate = data[0].date;
            this.Bobineuse3ThisYearNumber = mach.nbre;
            this.Bobineuse3ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Bobineuse3ThisYearMDT = 0;
            } else {
              this.Bobineuse3ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  bobineuse3Stats2(){
    this.alpicamService.bobineuse3LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Bobineuse3LastYearDate = datas[0].date;
            this.Bobineuse3LastYearNumber = mach.nbre;
            this.Bobineuse3LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Bobineuse3LastYearMDT = 0;
            } else {
              this.Bobineuse3LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  magbob1Stats(){
    this.alpicamService.magbob1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MagBobine1ThisYearDate = data[0].date;
            this.MagBobine1ThisYearNumber = mach.nbre;
            this.MagBobine1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MagBobine1ThisYearMDT = 0;
            } else {
              this.MagBobine1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  magbob1Stats2(){
    this.alpicamService.magbob1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MagBobine1LastYearDate = datas[0].date;
            this.MagBobine1LastYearNumber = mach.nbre;
            this.MagBobine1LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MagBobine1LastYearMDT = 0;
            } else {
              this.MagBobine1LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  magbob2Stats(){
    this.alpicamService.magbob2ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MagBobine2ThisYearDate = data[0].date;
            this.MagBobine2ThisYearNumber = mach.nbre;
            this.MagBobine2ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MagBobine2ThisYearMDT = 0;
            } else {
              this.MagBobine2ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  magbob2Stats2(){
    this.alpicamService.magbob2LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MagBobine2LastYearDate = datas[0].date;
            this.MagBobine2LastYearNumber = mach.nbre;
            this.MagBobine2LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MagBobine2LastYearMDT = 0;
            } else {
              this.MagBobine2LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  magbob3Stats(){
    this.alpicamService.magbob3ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MagBobine3ThisYearDate = data[0].date;
            this.MagBobine3ThisYearNumber = mach.nbre;
            this.MagBobine3ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MagBobine3ThisYearMDT = 0;
            } else {
              this.MagBobine3ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  magbob3Stats2(){
    this.alpicamService.magbob3LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MagBobine3LastYearDate = datas[0].date;
            this.MagBobine3LastYearNumber = mach.nbre;
            this.MagBobine3LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MagBobine3LastYearMDT = 0;
            } else {
              this.MagBobine3LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  massEZ4Stats(){
    this.alpicamService.massEZ4ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MassEZ4ThisYearDate = data[0].date;
            this.MassEZ4ThisYearNumber = mach.nbre;
            this.MassEZ4ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassEZ4ThisYearMDT = 0;
            } else {
              this.MassEZ4ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  massEZ4Stats2(){
    this.alpicamService.massEZ4LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MassEZ4LastYearDate = datas[0].date;
            this.MassEZ4LastYearNumber = mach.nbre;
            this.MassEZ4LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassEZ4LastYearMDT = 0;
            } else {
              this.MassEZ4LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  massEZ3Stats(){
    this.alpicamService.massEZ3ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MassEZ3ThisYearDate = data[0].date;
            this.MassEZ3ThisYearNumber = mach.nbre;
            this.MassEZ3ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassEZ3ThisYearMDT = 0;
            } else {
              this.MassEZ3ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  massEZ3Stats2(){
    this.alpicamService.massEZ3LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MassEZ3LastYearDate = datas[0].date;
            this.MassEZ3LastYearNumber = mach.nbre;
            this.MassEZ3LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassEZ3LastYearMDT = 0;
            } else {
              this.MassEZ3LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  massENStats(){
    this.alpicamService.massENThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MassENThisYearDate = data[0].date;
            this.MassENThisYearNumber = mach.nbre;
            this.MassENThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassENThisYearMDT = 0;
            } else {
              this.MassENThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  massENStats2(){
    this.alpicamService.massENLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MassENLastYearDate = datas[0].date;
            this.MassENLastYearNumber = mach.nbre;
            this.MassENLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassENLastYearMDT = 0;
            } else {
              this.MassENLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  massEZ1Stats(){
    this.alpicamService.massEZ1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MassEZ1ThisYearDate = data[0].date;
            this.MassEZ1ThisYearNumber = mach.nbre;
            this.MassEZ1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassEZ1ThisYearMDT = 0;
            } else {
              this.MassEZ1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  massEZ1Stats2(){
    this.alpicamService.massEZ1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MassEZ1LastYearDate = datas[0].date;
            this.MassEZ1LastYearNumber = mach.nbre;
            this.MassEZ1LastYearTDT = mach.TDT;
            this.MassEZ1LastYearMDT = (this.MassEZ1LastYearNumber < 1) ? 0 : (mach.TDT/mach.nbre);

            // if (mach.nbre == 0) {
            //   this.MassEZ1LastYearMDT = 0;
            // } else {
            //   this.MassEZ1LastYearTDT = mach.TDT / mach.nbre;
            // }
          }
        }
    );
  }

  massBStats(){
    this.alpicamService.massBThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MassBThisYearDate = data[0].date;
            this.MassBThisYearNumber = mach.nbre;
            this.MassBThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassBThisYearMDT = 0;
            } else {
              this.MassBThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  massBStats2(){
    this.alpicamService.massBLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MassBLastYearDate = datas[0].date;
            this.MassBLastYearNumber = mach.nbre;
            this.MassBLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassBLastYearMDT = 0;
            } else {
              this.MassBLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  massAStats(){
    this.alpicamService.massAThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.MassAThisYearDate = data[0].date;
            this.MassAThisYearNumber = mach.nbre;
            this.MassAThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassAThisYearMDT = 0;
            } else {
              this.MassAThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  massAStats2(){
    this.alpicamService.massALastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.MassALastYearDate = datas[0].date;
            this.MassALastYearNumber = mach.nbre;
            this.MassALastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.MassALastYearMDT = 0;
            } else {
              this.MassALastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechEZ1Stats(){
    this.alpicamService.sechEZ1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirEz1ThisYearDate = data[0].date;
            this.SechoirEz1ThisYearNumber = mach.nbre;
            this.SechoirEz1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz1ThisYearMDT = 0;
            } else {
              this.SechoirEz1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechEZ1Stats2(){
    this.alpicamService.sechEZ1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirEz1LastYearDate = datas[0].date;
            this.SechoirEz1LastYearNumber = mach.nbre;
            this.SechoirEz1LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz1LastYearMDT = 0;
            } else {
              this.SechoirEz1LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechEZ2Stats(){
    this.alpicamService.sechEZ2ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirEz2ThisYearDate = data[0].date;
            this.SechoirEz2ThisYearNumber = mach.nbre;
            this.SechoirEz2ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz2ThisYearMDT = 0;
            } else {
              this.SechoirEz2ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechEZ2Stats2(){
    this.alpicamService.sechEZ2LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirEz2LastYearDate = datas[0].date;
            this.SechoirEz2LastYearNumber = mach.nbre;
            this.SechoirEz2LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz2LastYearMDT = 0;
            } else {
              this.SechoirEz2LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechEZ3Stats(){
    this.alpicamService.sechEZ3ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirEz3ThisYearDate = data[0].date;
            this.SechoirEz3ThisYearNumber = mach.nbre;
            this.SechoirEz3ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz3ThisYearMDT = 0;
            } else {
              this.SechoirEz3ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechEZ3Stats2(){
    this.alpicamService.sechEZ3LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirEz3LastYearDate = datas[0].date;
            this.SechoirEz3LastYearNumber = mach.nbre;
            this.SechoirEz3LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz3LastYearMDT = 0;
            } else {
              this.SechoirEz3LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechEZ4Stats(){
    this.alpicamService.sechEZ4ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirEz4ThisYearDate = data[0].date;
            this.SechoirEz4ThisYearNumber = mach.nbre;
            this.SechoirEz4ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz4ThisYearMDT = 0;
            } else {
              this.SechoirEz4ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechEZ4Stats2(){
    this.alpicamService.sechEZ4LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirEz4LastYearDate = datas[0].date;
            this.SechoirEz4LastYearNumber = mach.nbre;
            this.SechoirEz4LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirEz4LastYearMDT = 0;
            } else {
              this.SechoirEz4LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechER24Stats(){
    this.alpicamService.sechER24ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirER24ThisYearDate = data[0].date;
            this.SechoirER24ThisYearNumber = mach.nbre;
            this.SechoirER24ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirER24ThisYearMDT = 0;
            } else {
              this.SechoirER24ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechER24Stats2(){
    this.alpicamService.sechER24LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirER24LastYearDate = datas[0].date;
            this.SechoirER24LastYearNumber = mach.nbre;
            this.SechoirER24LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirER24LastYearMDT = 0;
            } else {
              this.SechoirER24LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  sechENStats(){
    this.alpicamService.sechENThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.SechoirENThisYearDate = data[0].date;
            this.SechoirENThisYearNumber = mach.nbre;
            this.SechoirENThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirENThisYearMDT = 0;
            } else {
              this.SechoirENThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  sechENStats2(){
    this.alpicamService.sechENLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.SechoirENLastYearDate = datas[0].date;
            this.SechoirENLastYearNumber = mach.nbre;
            this.SechoirENLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.SechoirENLastYearMDT = 0;
            } else {
              this.SechoirENLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  tranchageStats(){
    this.alpicamService.tranchageThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.TranchageThisYearDate = data[0].date;
            this.TranchageThisYearNumber = mach.nbre;
            this.TranchageThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.TranchageThisYearMDT = 0;
            } else {
              this.TranchageThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  tranchageStats2(){
    this.alpicamService.tranchageLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.TranchageLastYearDate = datas[0].date;
            this.TranchageLastYearNumber = mach.nbre;
            this.TranchageLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.TranchageLastYearMDT = 0;
            } else {
              this.TranchageLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  scieBongStats(){
    this.alpicamService.scieBongThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.ScieBongioaniThisYearDate = data[0].date;
            this.ScieBongioaniThisYearNumber = mach.nbre;
            this.ScieBongioaniThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.ScieBongioaniThisYearMDT = 0;
            } else {
              this.ScieBongioaniThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  scieBongStats2(){
    this.alpicamService.scieBongLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.ScieBongioaniLastYearDate = datas[0].date;
            this.ScieBongioaniLastYearNumber = mach.nbre;
            this.ScieBongioaniLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.ScieBongioaniLastYearMDT = 0;
            } else {
              this.ScieBongioaniLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encolleuse1BrazilStats(){
    this.alpicamService.encolleuse1BrazilThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Encolleuse1BrazilThisYearDate = data[0].date;
            this.Encolleuse1BrazilThisYearNumber = mach.nbre;
            this.Encolleuse1BrazilThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse1BrazilThisYearMDT = 0;
            } else {
              this.Encolleuse1BrazilThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encolleuse1BrazilStats2(){
    this.alpicamService.encolleuse1BrazilLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Encolleuse1BrazilLastYearDate = datas[0].date;
            this.Encolleuse1BrazilLastYearNumber = mach.nbre;
            this.Encolleuse1BrazilLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse1BrazilLastYearMDT = 0;
            } else {
              this.Encolleuse1BrazilLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encolleuse2BrazilStats(){
    this.alpicamService.encolleuse2BrazilThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Encolleuse2BrazilThisYearDate = data[0].date;
            this.Encolleuse2BrazilThisYearNumber = mach.nbre;
            this.Encolleuse2BrazilThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse2BrazilThisYearMDT = 0;
            } else {
              this.Encolleuse2BrazilThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encolleuse2BrazilStats2(){
    this.alpicamService.encolleuse2BrazilLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Encolleuse2BrazilLastYearDate = datas[0].date;
            this.Encolleuse2BrazilLastYearNumber = mach.nbre;
            this.Encolleuse2BrazilLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse2BrazilLastYearMDT = 0;
            } else {
              this.Encolleuse2BrazilLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encolleuse3BrazilStats(){
    this.alpicamService.encolleuse3BrazilThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Encolleuse3BrazilThisYearDate = data[0].date;
            this.Encolleuse3BrazilThisYearNumber = mach.nbre;
            this.Encolleuse3BrazilThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse3BrazilThisYearMDT = 0;
            } else {
              this.Encolleuse3BrazilThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encolleuse3BrazilStats2(){
    this.alpicamService.encolleuse3BrazilLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Encolleuse3BrazilLastYearDate = datas[0].date;
            this.Encolleuse3BrazilLastYearNumber = mach.nbre;
            this.Encolleuse3BrazilLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse3BrazilLastYearMDT = 0;
            } else {
              this.Encolleuse3BrazilLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encolleuse1CPStats(){
    this.alpicamService.encolleuse1CPThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Encolleuse1PagnioniThisYearDate = data[0].date;
            this.Encolleuse1PagnioniThisYearNumber = mach.nbre;
            this.Encolleuse1PagnioniThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse1PagnioniThisYearMDT = 0;
            } else {
              this.Encolleuse1PagnioniThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encolleuse1CPStats2(){
    this.alpicamService.encolleuse1CPLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Encolleuse1PagnioniLastYearDate = datas[0].date;
            this.Encolleuse1PagnioniLastYearNumber = mach.nbre;
            this.Encolleuse1PagnioniLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse1PagnioniLastYearMDT = 0;
            } else {
              this.Encolleuse1PagnioniLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encolleuse2CPStats(){
    this.alpicamService.encolleuse2CPThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Encolleuse2PagnioniThisYearDate = data[0].date;
            this.Encolleuse2PagnioniThisYearNumber = mach.nbre;
            this.Encolleuse2PagnioniThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse2PagnioniThisYearMDT = 0;
            } else {
              this.Encolleuse2PagnioniThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encolleuse2CPStats2(){
    this.alpicamService.encolleuse2CPLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Encolleuse2PagnioniLastYearDate = datas[0].date;
            this.Encolleuse2PagnioniLastYearNumber = mach.nbre;
            this.Encolleuse2PagnioniLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse2PagnioniLastYearMDT = 0;
            } else {
              this.Encolleuse2PagnioniLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  encolleuse3CPStats(){
    this.alpicamService.encolleuse3CPThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Encolleuse3SimiThisYearDate = data[0].date;
            this.Encolleuse3SimiThisYearNumber = mach.nbre;
            this.Encolleuse3SimiThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse3SimiThisYearMDT = 0;
            } else {
              this.Encolleuse3SimiThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  encolleuse3CPStats2(){
    this.alpicamService.encolleuse3CPLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Encolleuse3SimiLastYearDate = datas[0].date;
            this.Encolleuse3SimiLastYearNumber = mach.nbre;
            this.Encolleuse3SimiLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Encolleuse3SimiLastYearMDT = 0;
            } else {
              this.Encolleuse3SimiLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  presseTeteStats(){
    this.alpicamService.presseTeteThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.PresseTeteThisYearDate = data[0].date;
            this.PresseTeteThisYearNumber = mach.nbre;
            this.PresseTeteThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.PresseTeteThisYearMDT = 0;
            } else {
              this.PresseTeteThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  presseTeteStats2(){
    this.alpicamService.presseTeteLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.PresseTeteLastYearDate = datas[0].date;
            this.PresseTeteLastYearNumber = mach.nbre;
            this.PresseTeteLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.PresseTeteLastYearMDT = 0;
            } else {
              this.PresseTeteLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  presseSimiStats(){
    this.alpicamService.presseSimiThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.PresseSimiThisYearDate = data[0].date;
            this.PresseSimiThisYearNumber = mach.nbre;
            this.PresseSimiThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.PresseSimiThisYearMDT = 0;
            } else {
              this.PresseSimiThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  presseSimiStats2(){
    this.alpicamService.presseSimiLastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.PresseSimiLastYearDate = datas[0].date;
            this.PresseSimiLastYearNumber = mach.nbre;
            this.PresseSimiLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.PresseSimiLastYearMDT = 0;
            } else {
              this.PresseSimiLastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  trancheuse1Stats(){
    this.alpicamService.trancheuse1ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Trancheuse1ThisYearDate = data[0].date;
            this.Trancheuse1ThisYearNumber = mach.nbre;
            this.Trancheuse1ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Trancheuse1ThisYearMDT = 0;
            } else {
              this.Trancheuse1ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  trancheuse1Stats2(){
    this.alpicamService.trancheuse1LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Trancheuse1LastYearDate = datas[0].date;
            this.Trancheuse1LastYearNumber = mach.nbre;
            this.Trancheuse1LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Trancheuse1LastYearMDT = 0;
            } else {
              this.Trancheuse1LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  trancheuse2Stats(){
    this.alpicamService.trancheuse2ThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.Trancheuse2ThisYearDate = data[0].date;
            this.Trancheuse2ThisYearNumber = mach.nbre;
            this.Trancheuse2ThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Trancheuse2ThisYearMDT = 0;
            } else {
              this.Trancheuse2ThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  trancheuse2Stats2(){
    this.alpicamService.trancheuse2LastYear().subscribe(
        datas => {
          // this.alpiLY = datas
          for (let mach of datas) {
            this.Trancheuse2LastYearDate = datas[0].date;
            this.Trancheuse2LastYearNumber = mach.nbre;
            this.Trancheuse2LastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.Trancheuse2LastYearMDT = 0;
            } else {
              this.Trancheuse2LastYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }

  cpStats(){
    this.alpicamService.contreplaqueThisYear().subscribe(
        data => {
          // this.alpiTY = data
          for (let mach of data){
            this.CPThisYearDate = data[0].date;
            this.CPThisYearNumber = mach.nbre;
            this.CPThisYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.CPThisYearMDT = 0;
            } else {
              this.CPThisYearMDT = mach.TDT / mach.nbre;
            }
          }
        }
    );
  }
  cpStats2(){

    this.alpicamService.contreplaqueLastYear().subscribe(
        datas => {
          // this.alpiLY = datas

          for (let mach of datas) {
            this.CPLastYearDate = datas[0].date;
            this.CPLastYearNumber = mach.nbre;
            this.CPLastYearTDT = mach.TDT;
            if (mach.nbre == 0) {
              this.CPLastYearMDT = 0;
            } else {
              this.CPLastYearMDT = mach.TDT / mach.nbre;
            }
          }
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
}
