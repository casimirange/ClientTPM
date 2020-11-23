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
import DateTimeFormat = Intl.DateTimeFormat;
import {TokenStorageService} from "../../../../auth/token-storage.service";
import {Location} from "@angular/common";

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

    wt: number;
    ttr: number;
    dt: number;

    countUnfinishedFailure: number;

    term: string;
    p: number;
    f: Date;
    d: Date;
    dat: Date;
    ha: DateTimeFormat;
    fi: DateTimeFormat;
    di: DateTimeFormat;
    piece: string;

    add_tec: boolean = false;
    private roles: string[];
    public authority: string;

    // @ViewChild('dayPicker') datePicker: DatePickerComponent;

    constructor(private machineService: MachinesService,
                private opService: OperateursService,
                private techService: TechniciensService,
                private fb: FormBuilder,
                private panneService: PannesService,
                private modalService: NgbModal,
                private tokenStorage: TokenStorageService,
                private router: Router, private _location: Location) {
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
        if (this.tokenStorage.getToken()) {
            this.roles = this.tokenStorage.getAuthorities();
            this.roles.every(role => {
                if (role === 'ROLE_ADMIN') {
                    this.authority = 'admin';
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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
                } else if (role === 'ROLE_SUPER_ADMIN') {
                    this.authority = 'super_admin';
                    return false;
                } else if (role === 'ROLE_USER_MINDOUROU') {
                    this.authority = 'user_mind';
                    // const Swal = require('sweetalert2');
                    // var content = document.createElement('div');
                    // content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
                    // Swal.fire({
                    //     title: 'Aucun Accès!',
                    //     html: content,
                    //     icon: 'error',
                    //     showCancelButton: false,
                    //     confirmButtonText: 'OK',
                    //     allowOutsideClick: false,
                    //     focusConfirm: true,
                    // }).then((result) => {
                    //     this._location.back();
                    // })
                    return false;
                } else if (role === 'ROLE_RESP_PLACAGE') {
                    this.authority = 'resp_pla';
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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
                } else if (role === 'ROLE_RESP_SCIERIE') {
                    this.authority = 'resp_sci';
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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
                } else if (role === 'ROLE_RESP_BRAZIL') {
                    this.authority = 'resp_bra';
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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
                } else if (role === 'ROLE_RESP_CP') {
                    this.authority = 'resp_cp';
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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
                } else if (role === 'ROLE_RESP_MAINTENANCE') {
                    this.authority = 'resp_maint';
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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
                    const Swal = require('sweetalert2');
                    var content = document.createElement('div');
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

    addPanne() {

        var result           = '';
        var result1           = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));

        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        var result2 = result+''+result1;
        console.log('random nber '+ result2)

        const nm = Math.floor((Math.random() * 1000) + (Math.random() * 99999999));
        const Swal = require('sweetalert2');

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


        if(!this.panne.idT.length){
            Swal.fire({
                title: 'Attention!!',
                text: "Vous n'avez sélectionné aucun technicien ",
                icon: 'warning',
                showCancelButton: true,
                showConfirmButton: false,
                cancelButtonColor: '#b97a56',
                cancelButtonText: 'OK',
                allowOutsideClick: false
            });
        }else{
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
            this.pn.numero = result2;
            this.pn.cont = this.panForm.controls['etat'].value;
            this.pn.quart = 1;


            var fi = new Date(this.pn.finInter);
            var ha = new Date(this.pn.heureArret);
            var di = new Date(this.pn.debutInter);
            this.wt = (di.getTime() - ha.getTime())/(1000*60);
            this.ttr = (fi.getTime() - di.getTime())/(1000*60);
            this.dt = (fi.getTime() - ha.getTime())/(1000*60);
            // var dt2 = wt + ttr;
            // console.log('wt ' + wt);
            // console.log('ttr ' + ttr);
            // console.log('dt ' + dt+ 'ou encore '+ dt2);
            this.pn.wt = this.wt;
            this.pn.ttr = this.ttr;
            this.pn.dt = this.dt;

            if(this.dt <= 15 && this.panForm.controls['etat'].value == 'true'){
                Swal.fire({
                    title: 'Impossible d\'enregistrer',
                    text: "Les pannes inférieures à 15 min ne sont pas enregistrées",
                    icon: 'error',
                    showCancelButton: true,
                    showConfirmButton: false,
                    cancelButtonColor: '#f65656',
                    cancelButtonText: 'OK',
                    allowOutsideClick: false
                });
            } else if((this.dt <= 15 && this.panForm.controls['etat'].value == 'false') || this.dt > 15){
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

        }
    }
        // const Swal = require('sweetalert2');
        if((this.dt <= 15 && this.panForm.controls['etat'].value == 'false') || this.dt > 15) {
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

    }

    initPanne(){
        this.panne = new Pannes();
        this.pn = new Pannes();
        this.createForm();
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

    loadOperateurs() {
            this.opService.getActiveOperateurs().subscribe(
                data => {
                    this.operateurs = data

                },
                error => {
                    console.log('une erreur a été détectée!')
                },
                () => {
                    console.log('chargement des techniciens actifs');
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
                this.countUnfinishedFailure = this.unPan.length;
                if (this.unPan.length >= 1){
                    const Swal = require('sweetalert2');
                    Swal.fire({
                        title: 'A titre d\'Information',
                        html: this.countUnfinishedFailure >1 ? "Vous avez <b>"+this.unPan.length+" pannes innachevées</b> en attente !": "Vous avez <b>"+this.unPan.length+" panne innachevée</b> en attente !",
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

    showMachine(m: Machine){
        console.log('machine' + m.nom);
        this.modalService.dismissAll();
        let url = btoa(m.idM.toString());
        this.router.navigateByUrl("machines/"+url);
    }

}
