import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PannesService} from "../../../services/pannes/pannes.service";
import {Pannes} from "../../../Models/pannes";
import {AgGridAngular} from "ag-grid-angular"
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-pannes',
  templateUrl: './pannes.component.html',
  styleUrls: ['./pannes.component.css']
})
export class PannesComponent implements OnInit {

  headings = 'Pannes';
  subheadings = 'Consultez la liste des pannes survenues';
  icons = 'fa fa-wrench icon-gradient bg-heavy-rain';

  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  rangeForm: FormGroup;
  pannes: Pannes[];
  cpannes: Pannes[];
  Tpannes: Pannes[];
  Hpannes: Pannes[];
  times: Pannes[];
  selectedPanne: Pannes;
  tail: number;
  count: number;

  machines: Machine[];
    closeResult: any;

  dataPanne = {
      labels: [],
      datasets: []
  };

  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private machineService: MachinesService,
              private modalService: NgbModal  ) {
      this.createForm();
      this.createForms();
      this.rangeForms();

  }

  ngOnInit() {
    this.loadPannes();
    this.countAllPannes();
    // this.loadTimePannes();
    // this.loadTechPannes();
    // this.TodayPannes();
    this.selectedPanne = new Pannes();
    this.getChart();
    // this.loadHeurePannes(this.selectedPanne);
    // this.wt();
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

  loadPannes(){

    this.panneService.getAllPannes().subscribe(
        data => {
          this.pannes = data;
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

  loadTimePannes(){

    this.panneService.getTimePannes().subscribe(
        data => {
          this.times = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des timespanes');
          console.log(this.times);
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

      this.panneService.getCountPannes().subscribe(
          list => list.forEach(mach => {
              this.dataPanne.labels.push(mach.machine);
              datasetNbrePanne.data.push(mach.nbre);
          } ) );

      this.dataPanne.datasets.push(datasetNbrePanne);


  }

}
