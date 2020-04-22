import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
// import {Router} from "@angular/router";
// import {DatePickerComponent} from "ng2-date-picker";
// // import {AmazingTimePickerService} from "amazing-time-picker";
import {MachinesService} from "../../../../services/machines/machines.service";
import {Machine} from "../../../../Models/machines";
import {Operateur} from "../../../../Models/operateurs";
import {OperateursService} from "../../../../services/operateurs/operateurs.service";
import {Technicien} from "../../../../Models/techniciens";
import {TechniciensService} from "../../../../services/techniciens/techniciens.service";
import {PannesService} from "../../../../services/pannes/pannes.service";
import {Router} from "@angular/router";
import {Pannes} from "../../../../Models/pannes";

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
  operateurs: Operateur[];
  selop: Operateur;
  techniciens: Technicien[];
  panne: Pannes;
  pn: Pannes;
    // @ViewChild('dayPicker') datePicker: DatePickerComponent;

    constructor( private machineService: MachinesService,
                 private opService: OperateursService,
                 private techService: TechniciensService,
                 private fb: FormBuilder,
                 private panneService: PannesService,
                 private router: Router
    ) {
        this.createForm();
        this.panne = new Pannes();
        this.pn = new Pannes();
        this.selop = new Operateur();
    }

    createForm() {
        this.panForm = this.fb.group({
            dateP: ['', [Validators.required]],
            idMachine: ['', [Validators.required]],
            heureArret: ['', [Validators.required]],
            debutInter: ['', [Validators.required]],
            finInter: ['', [Validators.required]],
            idOperateur: ['', [Validators.required]],
            // idTechnicien: ['', [Validators.required]],
            idTechnicien: this.fb.array([]),
            description: ['', [Validators.required]],
            cause: ['', [Validators.required]],
            details: ['', [Validators.required]],
            outil: [''],
            qte: [''],
            ref: [''],
            etat: ['', [Validators.required]],
        });


    }

  ngOnInit() {
    this.loadMachines();
    this.loadOperateurs();
    this.loadActiveTechniciens();
  }
    // open() { this.datePicker.api.open(); }
    // close() { this.datePicker.api.close(); }

  addPanne() {
    // const p = this.panForm.value;
    //
    // console.log('ancienne Panne');
    // console.log(p);
    //
    // const ha: string = this.panForm.controls['heureArret'].value.toString();
    // const isoHa = new Date(ha);
    // const isoHAs = isoHa.toJSON().slice(0, 19).replace('T', ' ');
    // const dt = new Date(isoHAs);
    // console.log('ha:'+ ha);
    // console.log('isoDate:'+ isoHa);
    // console.log('isoDates:'+ isoHAs);
    // // console.log('date heure:'+ dt);
      const nm = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));
    //
    // this.panne.date = this.panForm.controls['dateP'].value;
    // this.panne.idMachine = this.panForm.controls['idMachine'].value;
    // this.panne.heureArret = this.panForm.controls['heureArret'].value.toString();
    // this.panne.debutInter = this.panForm.controls['debutInter'].value.toString();
    // this.panne.finInter = this.panForm.controls['finInter'].value.toString();
    // this.panne.idOperateur = this.panForm.controls['idOperateur'].value;
    // // this.panne.idTechnicien = this.panForm.controls['idTechnicien'].value;
    this.panne.idT = this.panForm.controls['idTechnicien'].value ? this.panForm.controls['idTechnicien'].value : [];
    // this.panne.description = this.panForm.controls['description'].value;
    // this.panne.cause = this.panForm.controls['cause'].value;
    // this.panne.details = this.panForm.controls['details'].value;
    // this.panne.outil = this.panForm.controls['outil'].value;
    // this.panne.qte = this.panForm.controls['qte'].value;
    // this.panne.ref = this.panForm.controls['ref'].value;
    // this.panne.etat = this.panForm.controls['etat'].value;
    // this.panne.numero = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));
    //
    //   console.log('nouvelle Panne');
    //   console.log(this.panne);

    //dès qu'on crée le département on affiche immédiatement la liste

      for ( let x = 0; x< this.panne.idT.length; x++ ){
          console.log('nbre enrg '+ x);
          console.log(this.panne.idT[x]);
          console.log('hum '+ this.panForm.controls['idTechnicien'].value[x]);
          this.pn.date = this.panForm.controls['dateP'].value;
          this.pn.idMachine = this.panForm.controls['idMachine'].value;
          this.pn.heureArret = this.panForm.controls['heureArret'].value.toString();
          this.pn.debutInter = this.panForm.controls['debutInter'].value.toString();
          this.pn.finInter = this.panForm.controls['finInter'].value.toString();
          this.pn.idOperateur = this.panForm.controls['idOperateur'].value;
          this.pn.idTechnicien = this.panForm.controls['idTechnicien'].value[x];
          this.pn.description = this.panForm.controls['description'].value;
          this.pn.cause = this.panForm.controls['cause'].value;
          this.pn.details = this.panForm.controls['details'].value;
          this.pn.outil = this.panForm.controls['outil'].value;
          this.pn.qte = this.panForm.controls['qte'].value;
          this.pn.ref = this.panForm.controls['ref'].value;
          this.pn.etat = this.panForm.controls['etat'].value;
          this.pn.numero = nm;

          // console.log('idp: '+ this.pn.idTechnicien);
          // console.log('pnum: '+ this.pn.numero);
          // console.log('nPanne: '+ this.pn);
          // console.log('aPanne: '+ this.panne);
          // console.log('fPanne: '+ p);
          console.log('La panne alors : '+ this.pn)
          this.panneService.addPannes(this.pn).subscribe(
              res => {
                  // this.initTech();
                  // this.loadTechniciens();
                  // this.loadActiveTechniciens();
                  // this.loadDesactiveTechniciens();
                  //   this.router.navigateByUrl('/pannes')
              }
          );
      }



  }

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

    loadOperateurs() {
        this.opService.getOperateurs().subscribe(
            data => {
                this.operateurs = data

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens');
                console.log(this.operateurs)
            }
        );
    }

    loadActiveTechniciens() {
        this.techService.getActiveTechniciens().subscribe(
            data => {
                this.techniciens = data

            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens actifs');
                console.log(this.techniciens)
            }
        );
    }

    getTechni(){
        return this.panForm.get('idTechnicien') as FormArray;
    }

    onAddTech(){
        const newControl = this.fb.control('', Validators.required);
        this.getTechni().push(newControl);
    }

    onMoveTech(i: number){
        const newControl = this.fb.control('', Validators.required);
        this.getTechni().removeAt(i);
    }


}
