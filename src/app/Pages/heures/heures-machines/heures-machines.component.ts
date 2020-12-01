import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Machine} from "../../../Models/machines";
import {MachinesService} from "../../../services/machines/machines.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Heures} from "../../../Models/heures";
import {HeuresService} from "../../../services/heures/heures.service";
import {Router} from "@angular/router";
import {DatePipe, Location, Time} from "@angular/common";
import {log} from "util";
import {Departement} from "../../../Models/departement";
import {TokenStorageService} from "../../../auth/token-storage.service";

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
  machNonProg: any[];
  period: string = 'hier';
  term: string;
  p: number;
  f: Date;
  d: Date;
  piece: string = '';

  private roles: string[];
  public authority: string;
  constructor(private machineService: MachinesService,
              private fb: FormBuilder,
              private  heuresService: HeuresService,
              private datePipe: DatePipe,
              private router: Router,
              private tokenStorage: TokenStorageService,private _location: Location,
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
      date1: ['', Validators.required],
      date2: ['', Validators.required]
    });
  }
  newDateForms() {
    this.newDateForm = this.fb.group({
      date1: ['', Validators.required]
    });
  }
  choiceForms() {
    this.choiceForm = this.fb.group({
      pic: ['']
    });
  }
  monthForms() {
    this.monthForm = this.fb.group({
      date1: ['', Validators.required]
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
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      const Swal = require('sweetalert2');
      var content = document.createElement('div');
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_USER_MINDOUROU') {
          this.authority = 'user_mind';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_PLACAGE') {
          this.authority = 'resp_pla';
          return false;
        } else if (role === 'ROLE_RESP_SCIERIE') {
          this.authority = 'resp_sci';
          return false;
        } else if (role === 'ROLE_RESP_BRAZIL') {
          this.authority = 'resp_bra';
          return false;
        } else if (role === 'ROLE_RESP_CP') {
          this.authority = 'resp_cp';
          return false;
        } else if (role === 'ROLE_RESP_MAINTENANCE') {
          this.authority = 'resp_maint';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_RESP_MINDOUROU') {
          this.authority = 'resp_mind';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        }
        this.authority = 'user_alpi';
        return true;
      });
    }
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
    this.machineService.getActiveMachines().subscribe(
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
          console.log(this.heures);
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
          console.log(this.heures);
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
          console.log(this.heures);
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
    this.heuresService.machNonProg(dep).subscribe(
        data => {
          this.machNonProg = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('mach prog');
          console.log(this.machNonProg);
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
    this.heuresService.machNonProgRange(dep, d1).subscribe(
        data => {
          this.machNonProg = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('mach prog');
          console.log(this.machNonProg);
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
    this.heuresService.machNonProgRangeMonth(dep, d1).subscribe(
        data => {
          this.machNonProg = data;
        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('mach prog');
          console.log(this.machNonProg);
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
            if (this.selectPanForm.controls['periode'].value == 'tmp'){
              this.loadThisMonthHeures()
            }
            if (this.selectPanForm.controls['periode'].value == 'lmp'){
              this.loadLastMonthHeures()
            }
            if (this.selectPanForm.controls['periode'].value == 'pp'){
              this.RangeHeures()
            }
            if(this.piece == 'jour'){
              this.loadHeuresByDepRange()
            }
            if(this.piece == 'mois'){
              this.loadHeuresByDepRangeMonth()
            }
            if(this.piece == ''){
              this.loadHeuresByDep()
            }
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

  swal(heur: Heures){
    const Swal = require('sweetalert2');
    var content = document.createElement('div');
    content.innerHTML = 'Vouslez-vous vraimment supprimer cette heure? '+heur.machine;
    Swal.fire({
      title: 'Suppression',
      html: content,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00ace6',
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusConfirm: false,
      focusCancel: true,
      focusDeny: true,
    }).then((result) => {
      if (result.value) {
        this.deleteHour();
        Swal.fire({
          // title: tec.etat == false ? 'Activation' : 'Désactivation',
          html:  'suppression réussie',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  deleteHour(){
    this.heuresService.deleteDep(this.selectedHeure.idHeure).subscribe(
        res => {
          if (this.selectPanForm.controls['periode'].value == 'tmp'){
            this.loadThisMonthHeures()
          }
          if (this.selectPanForm.controls['periode'].value == 'lmp'){
            this.loadLastMonthHeures()
          }
          if (this.selectPanForm.controls['periode'].value == 'pp'){
            this.RangeHeures()
          }
          if(this.piece == 'jour'){
            this.loadHeuresByDepRange()
          }
          if(this.piece == 'mois'){
            this.loadHeuresByDepRangeMonth()
          }
          if(this.piece == ''){
            this.loadHeuresByDep()
          }
        }
    );
  }

}
