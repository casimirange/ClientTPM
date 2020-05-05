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
// import  Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
    continuePanne: Pannes;
    unPan: Pannes[];
    closeResult: any;
    Tpannes: Pannes[];
    // @ViewChild('dayPicker') datePicker: DatePickerComponent;

    constructor(private machineService: MachinesService,
                private opService: OperateursService,
                private techService: TechniciensService,
                private fb: FormBuilder,
                private panneService: PannesService,
                private modalService: NgbModal,
                private router: Router) {
        this.createForm();
        this.panne = new Pannes();
        this.pn = new Pannes();
        this.continuePanne = new Pannes();
        this.selop = new Operateur();

        if (this.panForm.controls['pic'].value == 'non'){
            this.panForm = this.fb.group({
                outil: [''],
                qte: [''],
                ref: [''],
            });
        }
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
            description: ['', [Validators.required, Validators.minLength(5)]],
            cause: ['', [Validators.required, Validators.minLength(5)]],
            details: ['', [Validators.required, Validators.minLength(5)]],
            outil: [''],
            qte: [''],
            ref: [''],
            etat: ['', [Validators.required]],
            pic: [''],
        });
    }

    ngOnInit() {
        this.loadMachines();
        this.loadOperateurs();
        this.loadActiveTechniciens();
        this.loadUnfinishedPannes();
        this.loadTechPannes(this.panne);


    }

    addPanne() {

        const nm = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));

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

        //ici je parcours la liste des utilisateurs ajoutés puis j'insère

        for (let x = 0; x < this.panne.idT.length; x++) {
            console.log('nbre enrg ' + x);
            console.log(this.panne.idT[x]);
            console.log('hum ' + this.panForm.controls['idTechnicien'].value[x]);
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

            //
            this.panneService.addPannes(this.pn).subscribe(
                res => {
                    if (this.panForm.controls['etat'].value == false){
                        this.initPanne();
                        this.loadUnfinishedPannes();
                    }else{
                        this.router.navigateByUrl('/pannes')
                    }

                }
            );
        }

        const Swal = require('sweetalert2');
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
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
            title: 'Panne Enregistrée'
        })

    }

    initPanne(){
        this.panne = new Pannes();
        this.pn = new Pannes();
        this.createForm();
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

    loadUnfinishedPannes() {
        this.panneService.getUnfinishedPannes().subscribe(
            data => {
                this.unPan = data;
                if (this.unPan.length >= 1){
                    const Swal = require('sweetalert2');
                    Swal.fire({
                        title: 'A titre d\'information',
                        text: "Vous avez des pannes innachevées en attente ",
                        icon: 'info',
                        showCancelButton: false,

                        confirmButtonText: 'OK',
                        allowOutsideClick: false
                    });
                }
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des techniciens actifs');
                console.log(this.unPan)
            }
        );
    }

    getTechni() {
        return this.panForm.get('idTechnicien') as FormArray;
    }

    onAddTech() {
        const newControl = this.fb.control('', Validators.required);
        this.getTechni().push(newControl);
    }

    onMoveTech(i: number) {
        const newControl = this.fb.control('', Validators.required);
        this.getTechni().removeAt(i);
    }

    open(content){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
                this.closeResult = `Closed with: ${result}`;
            }, (reason) =>{

            }
        );
    }

    loadTechPannes(pan: Pannes){

        this.panneService.getTechPannes(pan.numero).subscribe(
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
    }

}
