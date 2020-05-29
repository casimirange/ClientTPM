import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Heures} from "../../../Models/heures";
import {HeuresService} from "../../../services/heures/heures.service";
import {Router} from "@angular/router";
import {Time} from "@angular/common";

@Component({
  selector: 'app-heures-machines',
  templateUrl: './heures-machines.component.html',
  styleUrls: ['./heures-machines.component.css']
})
export class HeuresMachinesComponent implements OnInit {
  headings = 'Horaires Machines';
  subheadings = 'Enregistrer les heures de travail de chaque machines';
  icons = 'fa fa-clock icon-gradient bg-heavy-rain';

  heurForm: FormGroup;
  machines: Machine[];
  heures: Heures[];
  selectedHeure: Heures;

  day: Date;

  constructor(private machineService: MachinesService,
              private fb: FormBuilder,
              private  heuresService: HeuresService,
              private router: Router,
              private modalService: NgbModal,)
  {
    this.createForm();
    this.selectedHeure = new Heures();
    this.day = new Date();
  }

  createForm() {
    this.heurForm = this.fb.group({
      date: ['', [Validators.required]],
      // idMachine: ['', [Validators.required]],
      heure: ['', [Validators.required]],
      idMachine: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.loadMachines();
    this.loadHeures();
  }

  getMachine() {
    return this.heurForm.get('idMachine') as FormArray;
  }

  onAddMachine() {
    const newControl = this.fb.control('', Validators.required);
    this.getMachine().push(newControl);
  }

  onMoveMachine(i: number) {
    const newControl = this.fb.control('', Validators.required);
    this.getMachine().removeAt(i);
  }

  onResetMachine() {
    // const newControl = this.fb.control('', Validators.required);
    this.getMachine().clear();
  }

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

  loadHeures() {
    this.heuresService.getHeures().subscribe(
        data => {
          this.heures = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des heures');
          console.log(this.machines);
        }
    );
  }

  addHeure() {


    this.selectedHeure.idM = this.heurForm.controls['idMachine'].value ? this.heurForm.controls['idMachine'].value : [];

    //ici je parcours la liste des utilisateurs ajoutés puis j'insère


    for (let x = 0; x < this.selectedHeure.idM.length; x++) {
      console.log('nbre enrg ' + x);
      console.log(this.selectedHeure.idM[x]);
      console.log('hum ' + this.heurForm.controls['idMachine'].value[x]);
      this.selectedHeure.date = this.heurForm.controls['date'].value;
      this.selectedHeure.idMachine = this.heurForm.controls['idMachine'].value[x];

      this.selectedHeure.heure = this.heurForm.controls['heure'].value;
      console.log('heure: ' + parseInt(this.selectedHeure.heure.toString()));

      this.heuresService.addHeure(this.selectedHeure).subscribe(
          res => {
              this.loadHeures();
              this.onResetMachine();
              this.createForm();
              // this.router.navigateByUrl('/tempsMachine')
          }
      );
    }

    const Swal = require('sweetalert2');
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    Toast.fire({
      icon: 'success',
      title: 'Heure Enregistrée'
    })

  }

}
