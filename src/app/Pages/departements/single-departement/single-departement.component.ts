import { Component, OnInit } from '@angular/core';
import {DepartementsService} from "../../../services/departements/departements.service";
import {Departement} from "../../../Models/departement";
import {Route} from "@angular/compiler/src/core";
import {ActivatedRoute, ActivatedRouteSnapshot, Params, Router} from "@angular/router";
import {formatNumber} from "@angular/common";
import {__param} from "tslib";
import {LignesService} from "../../../services/lignes/lignes.service";
import {Ligne} from "../../../Models/lignes";
import {MachinesService} from "../../../services/machines/machines.service";
import {Machine} from "../../../Models/machines";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Pannes} from "../../../Models/pannes";
import {PannesService} from "../../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'lodash';
import {sortBy} from "sort-by-typescript";


@Component({
  selector: 'app-single-departement',
  templateUrl: './single-departement.component.html',
  styleUrls: ['./single-departement.component.css']
})
export class SingleDepartementComponent implements OnInit {

  heading = "dep";
  subheading = 'Gérez les départements dans l\'application';
  icon = 'fa fa-home icon-gradient';
  bg = 'text-white bg-midnight-bloom';

  // departements: Departement[];

  deps: Departement;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  rangeForm: FormGroup;
  selectedDep: Departement;
  selectedLigne: Ligne;
  lignes: Ligne[];
  machines: any[];
  pannes: Pannes[];
  nomMaj:string;
  cpannes: Pannes[];
  Tpannes: Pannes[];
  Hpannes: Pannes[];
  times: Pannes[];
  selectedPanne: Pannes;
  countThisMonthPanne: any;
  countLastMonthPanne: any;
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

  paretoYear = {
    labels: [],
    datasets: []
  };

  paretoMonth = {
    labels: [],
    datasets: []
  };

  DerouleuseparetoTDTYear = {
    labels: [],
    datasets: []
  };

  DerouleuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  DerouleuseparetoMDTYear = {
    labels: [],
    datasets: []
  };

  DerouleuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  BobineuseparetoTDTYear = {
    labels: [],
    datasets: []
  };

  BobineuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  BobineuseparetoMDTYear = {
    labels: [],
    datasets: []
  };

  BobineuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  MagBobineparetoTDTYear = {
    labels: [],
    datasets: []
  };

  MagBobineparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  MagBobineparetoMDTYear = {
    labels: [],
    datasets: []
  };

  MagBobineparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  MassicotparetoTDTYear = {
    labels: [],
    datasets: []
  };

  MassicotparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  MassicotparetoMDTYear = {
    labels: [],
    datasets: []
  };

  MassicotparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  SechoirparetoTDTYear = {
    labels: [],
    datasets: []
  };

  SechoirparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  SechoirparetoMDTYear = {
    labels: [],
    datasets: []
  };

  SechoirparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  TrancheuseparetoTDTYear = {
    labels: [],
    datasets: []
  };

  TrancheuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  TrancheuseparetoMDTYear = {
    labels: [],
    datasets: []
  };

  TrancheuseparetoMDTMonth = {
    labels: [],
    datasets: []
  };

  EncolleuseparetoTDTYear = {
    labels: [],
    datasets: []
  };

  EncolleuseparetoTDTMonth = {
    labels: [],
    datasets: []
  };

  EncolleuseparetoMDTYear = {
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

  constructor( private departementService: DepartementsService,
               private ligneService: LignesService,
               private panneService: PannesService,
               private machineService: MachinesService,
               private fb: FormBuilder,
               private modalService: NgbModal,
               private route: ActivatedRoute) {
    this.selectedDep = new Departement();
    this.selectedLigne = new Ligne();
    this.selectedPanne = new Pannes();
    this.createForm();
    this.createForms();
    this.rangeForms();
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

  rangeForms() {
    this.rangeForm = this.fb.group({
      date1: [''],
      date2: ['']
    });
  }

  ngOnInit() {
    this.showDepartement();
    this.ListMachines();
    this.showPannesDep();
    this.CountMonthPannes();
    this.HourPerMonth();
    this.mtbfAlpicam();
    this.paretoThysYear();
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
    this.paretoDerouleuseTDTThysYear();
    this.paretoDerouleuseMDTThysYear();
    this.paretoBobineuseTDTThysYear();
    this.paretoBobineuseMDTThysYear();
    this.paretoMagasinBobineTDTThysYear();
    this.paretoMagasinBobineMDTThysYear();
    this.paretoMassicotTDTThysYear();
    this.paretoMassicotMDTThysYear();
    this.paretoSechoirTDTThysYear();
    this.paretoSechoirMDTThysYear();
    this.paretoTrancheuseTDTThysYear();
    this.paretoTrancheuseMDTThysYear();
    this.paretoEncolleuseTDTThysYear();
    this.paretoEncolleuseMDTThysYear();
  }

  showDepartement() {
    this.route.params.subscribe(params => {
      this.departementService.showDep(Number.parseInt(params['id'])).subscribe(
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
      this.machineService.getAllMachinesByDepartment(Number.parseInt(params['id'])).subscribe(
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
      this.departementService.showPannesDep(Number.parseInt(params['id'])).subscribe(
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
      this.departementService.countThisMonthPannesDep(Number.parseInt(params['id'])).subscribe(
          data => {
            this.countThisMonthPanne = data;
          }
      ),
      this.departementService.countLastMonthPannesDep(Number.parseInt(params['id'])).subscribe(
          data => {
            this.countLastMonthPanne = data;
          }
      )
    });
  }
  HourPerMonth(){
    this.route.params.subscribe(params =>{
      this.departementService.hourThisMonthDep(Number.parseInt(params['id'])).subscribe(
          data => {
            this.hourThisMonth = data;
          }
      ),
      this.departementService.hourLastMonthDep(Number.parseInt(params['id'])).subscribe(
          data => {
            this.hourLastMonth = data;
          }
      )
    });
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

  ThisWeekPannes(){

    this.panneService.getThisWeekPannes().subscribe(
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

  LastWeekPannes(){

    this.panneService.getLastWeekPannes().subscribe(
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

  LastMonthPannes(){

    this.panneService.getLastMonthPannes().subscribe(
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

  ThisMonthPannes(){

    this.panneService.getThisMonthPannes().subscribe(
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

  LastYearPannes(){

    this.panneService.getLastYearPannes().subscribe(
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

  ThisYearPannes(){

    this.panneService.getThisYearPannes().subscribe(
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

  rangeDate(){
    console.log('rien');
    const d1 = this.rangeForm.controls['date1'].value;
    const d2 = this.rangeForm.controls['date2'].value;

    console.log(d1 + ' et '+ d2);

    this.panneService.getRangeDatePannes(d1, d2).subscribe(
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

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
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
    this.departementService.mtbfByYear(Number.parseInt(params['id'])).subscribe(
      data1 => {
        this.mtbfY = data1;
        this.departementService.mtbfThisYear(Number.parseInt(params['id'])).subscribe(
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
              ttr.data.push(mach.TTR/mach.nbre);
              wt.data.push(mach.WT/mach.nbre);
              mdt.data.push(mach.TDT/mach.nbre);
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

  paretoThysYear(){
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
      this.departementService.paretoThisYear(Number.parseInt(params['id'])).subscribe(
        list => list.forEach(mach => {
          // datasetNbrePanne2.name = (mach.machine);
          this.paretoYear.labels.push(mach.nom);
          datasetNbrePanne3.data.push(mach.nbre);
          datasetNbrePanne4.data.push(mach.TDT);

        }));
    });
    this.paretoYear.datasets.push(datasetNbrePanne3);
    this.paretoYear.datasets.push(datasetNbrePanne4);
  }

  paretoThysMonth(){
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
      this.departementService.paretoThisMonth(Number.parseInt(params['id'])).subscribe(
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
            this.departementService.ligne1ByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.L1mtbfY = data1;
                    this.departementService.ligne1ThisYear(Number.parseInt(params['id'])).subscribe(
                        data2 => {
                            this.L1mtbfTY = data2;
                            this.L1mtbf = this.L1mtbfY.concat(this.L1mtbfTY);
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.ligne2ByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.L2mtbfY = data1;
                    this.departementService.ligne2ThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.ligne3ByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.L3mtbfY = data1;
                    this.departementService.ligne3ThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.sechoirByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.SecmtbfY = data1;
                    this.departementService.sechoirThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.ecorcageByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.EcmtbfY = data1;
                    this.departementService.ecorcageThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.jointageByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.JmtbfY = data1;
                    this.departementService.jointageThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.encollageBrazilByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.EBmtbfY = data1;
                    this.departementService.encollageBrazilThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.teintureByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.TEmtbfY = data1;
                    this.departementService.teintureThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.tranchageByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.TRmtbfY = data1;
                    this.departementService.tranchageThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.encollageCPByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.ECPmtbfY = data1;
                    this.departementService.encollageCPThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.ponçageByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.POmtbfY = data1;
                    this.departementService.ponçageThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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
            this.departementService.pressageByYear(Number.parseInt(params['id'])).subscribe(
                data1 => {
                    this.PRmtbfY = data1;
                    this.departementService.pressageThisYear(Number.parseInt(params['id'])).subscribe(
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
                                ttr.data.push(mach.TTR/mach.nbre);
                                wt.data.push(mach.WT/mach.nbre);
                                mdt.data.push(mach.TDT/mach.nbre);
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

    paretoDerouleuseTDTThysYear(){
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
        this.departementService.paretoDerouleuseTDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.DerouleuseparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoTDTYear.datasets.push(datasetNbrePanne4);
    }

    paretoDerouleuseTDTThysMonth(){
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

    paretoDerouleuseMDTThysYear(){
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
        this.departementService.paretoDerouleuseMDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.DerouleuseparetoMDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.DerouleuseparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.DerouleuseparetoMDTYear.datasets.push(datasetNbrePanne4);
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

    // ----------------------------------

    paretoBobineuseTDTThysYear(){
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
        this.departementService.paretoBobineuseTDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.BobineuseparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoTDTYear.datasets.push(datasetNbrePanne4);
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

    paretoBobineuseMDTThysYear(){
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
        this.departementService.paretoBobineuseMDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.BobineuseparetoMDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.BobineuseparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.BobineuseparetoMDTYear.datasets.push(datasetNbrePanne4);
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

    // ----------------------------------

    paretoMagasinBobineTDTThysYear(){
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
        this.departementService.paretoMagasinBobineTDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MagBobineparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoTDTYear.datasets.push(datasetNbrePanne4);
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

    paretoMagasinBobineMDTThysYear(){
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
        this.departementService.paretoMagasinBobineMDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MagBobineparetoMDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MagBobineparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.MagBobineparetoMDTYear.datasets.push(datasetNbrePanne4);
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

    // ----------------------------------

    paretoMassicotTDTThysYear(){
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
        this.departementService.paretoMassicotTDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.MassicotparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.MassicotparetoTDTYear.datasets.push(datasetNbrePanne4);
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

    paretoMassicotMDTThysYear(){
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
        this.departementService.paretoMassicotMDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.MassicotparetoMDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.MassicotparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.MassicotparetoMDTYear.datasets.push(datasetNbrePanne4);
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

    // ----------------------------------

    paretoSechoirTDTThysYear(){
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
        this.departementService.paretoSechoirTDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.SechoirparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.SechoirparetoTDTYear.datasets.push(datasetNbrePanne4);
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

    paretoSechoirMDTThysYear(){
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
        this.departementService.paretoSechoirMDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.SechoirparetoMDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.SechoirparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.SechoirparetoMDTYear.datasets.push(datasetNbrePanne4);
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

    // Paretos Brazil
    // ---------------------------------

    paretoTrancheuseTDTThysYear(){
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
        this.departementService.paretoTrancheuseTDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
        this.TrancheuseparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoTDTYear.datasets.push(datasetNbrePanne4);
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

    paretoTrancheuseMDTThysYear(){
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
        this.departementService.paretoTrancheuseMDTThisYear().subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.TrancheuseparetoMDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.MDT);

            }));
        this.TrancheuseparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.TrancheuseparetoMDTYear.datasets.push(datasetNbrePanne4);
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

    // ---------------------------------

    paretoEncolleuseTDTThysYear(){
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
        this.route.params.subscribe(params =>{
        this.departementService.paretoEncolleuseTDTThisYear(Number.parseInt(params['id'])).subscribe(
            list => list.forEach(mach => {
                // datasetNbrePanne2.name = (mach.machine);
                this.EncolleuseparetoTDTYear.labels.push(mach.nom.toUpperCase());
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.TDT);

            }));
            });
        this.EncolleuseparetoTDTYear.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoTDTYear.datasets.push(datasetNbrePanne4);
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
        this.route.params.subscribe(params =>{
        this.departementService.paretoEncolleuseTDTThisMonth(Number.parseInt(params['id'])).subscribe(
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

    paretoEncolleuseMDTThysYear(){
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
        this.route.params.subscribe(params => {
            this.departementService.paretoEncolleuseMDTThisYear(Number.parseInt(params['id'])).subscribe(
                list => list.forEach(mach => {
                    // datasetNbrePanne2.name = (mach.machine);
                    this.EncolleuseparetoMDTYear.labels.push(mach.nom.toUpperCase());
                    datasetNbrePanne3.data.push(mach.nbre);
                    datasetNbrePanne4.data.push(mach.MDT);

                }));
        });
        this.EncolleuseparetoMDTYear.datasets.push(datasetNbrePanne3);
        this.EncolleuseparetoMDTYear.datasets.push(datasetNbrePanne4);
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
        this.route.params.subscribe(params => {
            this.departementService.paretoEncolleuseMDTThisMonth(Number.parseInt(params['id'])).subscribe(
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
}
