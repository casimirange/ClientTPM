import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Heures} from "../../../Models/heures";
import {HeuresService} from "../../../services/heures/heures.service";
import {Router} from "@angular/router";
import {DatePipe, Time} from "@angular/common";
import {log} from "util";
import {Departement} from "../../../Models/departement";

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
  rangeForm: FormGroup;
  newDateForm: FormGroup;
  choiceForm: FormGroup;
  monthForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  machines: Machine[];
  heures: Heures[];
  selectedHeure: Heures;
  pages: number = 7;
  day: Date;
  ranger: string = 'false';
  heuresByDep: any[];
  date_this_months: any;
  closeResult: any;
  machProg: any[];
  period: string = 'hier';

  constructor(private machineService: MachinesService,
              private fb: FormBuilder,
              private  heuresService: HeuresService,
              private datePipe: DatePipe,
              private router: Router,
              private modalService: NgbModal,)
  {
    this.createForm();
    this.rangeForms();
    this.newDateForms();
    this.choiceForms();
    this.monthForms();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.selectedHeure = new Heures();
    this.day = new Date();
  }

  pageForms() {
    this.pageForm = this.fb.group({
      page: ['']
    });
  }

  createForm() {
    this.heurForm = this.fb.group({
      date: ['', [Validators.required]],
      // idMachine: ['', [Validators.required]],
      heure: ['', [Validators.required]],
      idMachine: this.fb.array([]),
    });
  }
  rangeForms() {
    this.rangeForm = this.fb.group({
      date1: [''],
      date2: ['']
    });
  }
  newDateForms() {
    this.newDateForm = this.fb.group({
      date1: ['']
    });
  }
  choiceForms() {
    this.choiceForm = this.fb.group({
      pic: ['']
    });
  }
  monthForms() {
    this.monthForm = this.fb.group({
      date1: ['']
    });
  }

  createForm1() {
    this.searchPanForm = this.fb.group({
      search: [''],
    });
  }

  createForms() {
    this.selectPanForm = this.fb.group({
      periode: ['']
    });
  }


  ngOnInit() {
    this.loadMachines();
    this.loadThisMonthHeures();
    this.loadHeuresByDep();
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

  loadThisMonthHeures() {
    this.heuresService.getThisMonthHeures().subscribe(
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

  loadLastMonthHeures() {
    this.heuresService.getLastMonthHeures().subscribe(
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

  RangeHeures() {
    const d1 = this.rangeForm.controls['date1'].value;
    const d2 = this.rangeForm.controls['date2'].value;
    this.heuresService.getRangeHeures(d1, d2).subscribe(
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

  loadMachProgByDep(dep: string) {
    this.period = 'hier';
    this.heuresService.getMachProg(dep).subscribe(
        data => {
          this.machProg = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('mach prog');
          console.log(this.machProg);
        }
    );
  }

  decimal(x: number){
      if (Number.isInteger(x)) {
        return true;
      }
      return false;
  }

  loadMachProgByDepRange(dep: string) {
    this.period = 'day';
    const d1 = this.newDateForm.controls['date1'].value;
    this.heuresService.getMachProgRange(dep, d1).subscribe(
        data => {
          this.machProg = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('mach prog');
          console.log(this.machProg);
        }
    );
  }

  loadMachProgByDepRangeMonth(dep: string) {
    this.period = 'month';
    const d1 = this.monthForm.controls['date1'].value;
    console.log('string date: '+d1);
    this.heuresService.getMachProgRangeMonth(dep, d1).subscribe(
        data => {
          this.machProg = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('mach prog');
          console.log(this.machProg);
        }
    );
  }

  loadHeuresByDep() {
    this.heuresService.getHeuresByDep().subscribe(
        data => {
          this.heuresByDep = data;
          this.date_this_months = 'Journée du '+this.datePipe.transform(this.day.setDate(this.day.getDate()-1), 'dd/MM/yyyy');
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des du hier');
        }
    );
  }

  loadHeuresByDepRange() {
    const d1 = this.newDateForm.controls['date1'].value;
    this.date_this_months = 'Journée du '+this.datePipe.transform(d1, 'dd/MM/yyyy');
    this.heuresService.getHeuresByDepRange(d1).subscribe(
        data => {
          this.heuresByDep = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des range');
        }
    );
  }

  loadHeuresByDepRangeMonth() {
    const d1 = this.monthForm.controls['date1'].value;
    console.log('string date: '+d1);
    this.date_this_months = 'Mois de '+this.datePipe.transform(d1, 'MMMM yyyy');
    this.heuresService.getHeuresByDepRangeMonth(d1).subscribe(
        data => {
          this.heuresByDep = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des range');
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
              this.loadThisMonthHeures();
              this.loadHeuresByDep();
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

  findSso($event){
    if (this.selectPanForm.controls['periode'].value == 'tmp'){
      this.loadThisMonthHeures()
    }
    if (this.selectPanForm.controls['periode'].value == 'lmp'){
      this.loadLastMonthHeures()
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

  modal(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
  }

}
