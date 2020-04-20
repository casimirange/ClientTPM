import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
// import {Router} from "@angular/router";
// import {DatePickerComponent} from "ng2-date-picker";
// // import {AmazingTimePickerService} from "amazing-time-picker";
import {MachinesService} from "../../../../services/machines/machines.service";
import {Machine} from "../../../../Models/machines";

@Component({
  selector: 'app-new-panne',
  templateUrl: './new-panne.component.html',
  styleUrls: ['./new-panne.component.css']
})
export class NewPanneComponent implements OnInit {
  headings = 'Nouvelle Panne';
  subheadings = 'Déclarez les pannes survenues au cours de la journée';
  icons = 'fa fa-wrench icon-gradient bg-heavy-rain';

  panForm: FormGroup;
  machines: Machine[];
    // @ViewChild('dayPicker') datePicker: DatePickerComponent;

    constructor( private machineService: MachinesService) { }

  ngOnInit() {
    this.loadMachines();
  }
    // open() { this.datePicker.api.open(); }
    // close() { this.datePicker.api.close(); }

  // addTechnicien() {
  //   const t = this.techForm.value;
  //   console.log(t);
  //
  //   //dès qu'on crée le département on affiche immédiatement la liste
  //   this.techService.addTech(t).subscribe(
  //       res => {
  //         this.initTech();
  //         this.loadTechniciens();
  //         this.loadActiveTechniciens();
  //         this.loadDesactiveTechniciens();
  //       }
  //   );
  //
  // }

    // open(){
    //     const am = this.atp.open();
    //     am.afterClose().subscribe(time => {
    //         console.log(time);
    //     });
    // }

    loadMachines() {
        this.machineService.getMachines().subscribe(
            data => {
                this.machines = data;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des machines');
                console.log(this.machines);
                console.log('liste des lignes', this.machines);
            }
        );
    }


}
