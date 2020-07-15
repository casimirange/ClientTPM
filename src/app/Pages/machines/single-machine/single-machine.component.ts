import { Component, OnInit } from '@angular/core';
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
import {ActivatedRoute} from "@angular/router";
import {Pannes} from "../../../Models/pannes";
import {PannesService} from "../../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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

  selectedMachine: Machine;
  selectedPanne: Pannes;
  pannes: Pannes[];
  Tpannes: Pannes[];
  Hpannes: Pannes[];
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

  constructor(private machineService: MachinesService,
              private panneService: PannesService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.selectedMachine = new Machine;
    this.selectedPanne = new Pannes();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.url = atob(params['id']);
    });
    this.showMachine();
    this.historiquePannes();
    this.HourPerMonth();
    this.mtbfAlpicam();
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

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
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
      yAxisID: 'y-axis-1',
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
}
