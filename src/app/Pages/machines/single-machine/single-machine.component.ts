import { Component, OnInit } from '@angular/core';
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
import {ActivatedRoute} from "@angular/router";
import {Pannes} from "../../../Models/pannes";
import {PannesService} from "../../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Color} from "ng2-charts";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-single-machine',
  templateUrl: './single-machine.component.html',
  styleUrls: ['./single-machine.component.css']
})
export class SingleMachineComponent implements OnInit {
  heading = "dep";
  subheading = 'Retrouvez la fiche historique des pannes de la machine';
  icon = 'fa fa-home icon-gradient';
  bg = 'text-white bg-midnight-bloom';

    term: string;
    p: number;

  selectedMachine: Machine;
  selectedPanne: Pannes;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  rangeForm: FormGroup;
  pageForm: FormGroup;
  pannes: Pannes[];
  Tpannes: Pannes[];
  Hpannes: Pannes[];
  ranger:string = "false";
  pages:number = 7;
  Opannes: Pannes[];
  Detailspannes: Pannes[];
  Outilpannes: Pannes[];
  public url: any;
  tail: number;
  closeResult: any;

  hourThisMonth: any;
  hourLastMonth: any;

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

  constructor(private machineService: MachinesService,
              private panneService: PannesService,
              private modalService: NgbModal,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.selectedMachine = new Machine;
    this.selectedPanne = new Pannes();
      this.createForm();
      this.createForms();
      this.rangeForms();
      this.pageForms();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.url = atob(params['id']);
    });
    this.showMachine();
    this.ThisMonthPannes();
    this.HourPerMonth();
    this.mtbfAlpicam();
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
            date1: [''],
            date2: ['']
        });
    }

  showMachine() {
      this.machineService.showMachine(Number.parseInt(this.url)).subscribe(
          res => {
            this.selectedMachine = res;
          }
      )
  }

  historiquePannes(){
    this.machineService.historiquePannes(Number.parseInt(this.url)).subscribe(
        res => {
          this.pannes = res;
        }
    )
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
        this.route.params.subscribe(params =>{
            let url = atob(params['id']);
            this.machineService.getTodayPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getHierPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getThisWeekPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getLastWeekPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getLastMonthPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getThisMonthPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getLastYearPannes(Number.parseInt(url)).subscribe(
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
            this.machineService.getThisYearPannes(Number.parseInt(url)).subscribe(
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

            this.machineService.getRangeDatePannes(Number.parseInt(url), d1, d2).subscribe(
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

  HourPerMonth(){
    this.route.params.subscribe(params =>{
      this.machineService.hourThisMonthDep(Number.parseInt(atob(params['id']))).subscribe(
          data => {
            this.hourThisMonth = data;
          }
      ),
          this.machineService.hourLastMonthDep(Number.parseInt(atob(params['id']))).subscribe(
              data => {
                this.hourLastMonth = data;
              }
          )
    });
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
      yAxisID: 'y-axis-0',
      type: 'line',
    };

    this.route.params.subscribe(params =>{

      this.machineService.mtbfByYear(Number.parseInt(atob(params['id']))).subscribe(
          data1 => {
            this.mtbfY = data1;
            this.machineService.mtbfThisYear(Number.parseInt(atob(params['id']))).subscribe(
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
    });

    this.mtbfByYear.datasets.push(mtbf);
    this.mtbfByYear.datasets.push(tdt);
    this.mtbfByYear.datasets.push(panne);

    this.mdtByYear.datasets.push(wt);
    this.mdtByYear.datasets.push(ttr);
    this.mdtByYear.datasets.push(mdt);
    // this.test.datasets.push(teste);
    // this.labs.categories.push(this.mtbfByYear.labels);
    // this.labs.categories.push(test1.categories)

  }

    findSso($event){
        if (this.selectPanForm.controls['periode'].value == 'hp'){
            this.HierPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'ttesp'){
            this.historiquePannes();
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
}
