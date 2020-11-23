import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LignesService} from "../../services/lignes/lignes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Ligne} from "../../Models/lignes";
import {Departement} from "../../Models/departement";
import {DepartementsService} from "../../services/departements/departements.service";
import * as _ from 'lodash';
import {forEachComment} from "tslint";
import {variable} from "@angular/compiler/src/output/output_ast";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-lignes',
    templateUrl: './lignes.component.html',
    styleUrls: ['./lignes.component.css']
})
export class LignesComponent implements OnInit {

    headings = 'Lignes';
    subheadings = 'Chaque département est constitué de ligne au-quelle on attribut des machines';
    icons = 'fa fa-road icon-gradient bg-primary';

    ligneModel: Ligne;
    lignes: Ligne[];
    ligneForm: FormGroup;

    operation: string = 'add';

    selectedLigne: Ligne;

    deps: Departement[];
    deps2: Departement[];
    newdep: Departement;
    term: string;
    p: number;
    f: Date;
    d: Date;
    private roles: string[];
    public authority: string;

    constructor(private fb: FormBuilder,
                private ligneService: LignesService,
                private depService: DepartementsService,
                private route: ActivatedRoute,
                private router: Router,
                private tokenStorage: TokenStorageService,private _location: Location) {
        this.createForm();
        this.ligneModel = new Ligne();
        this.newdep = new Departement();
    }

    createForm() {
        this.ligneForm = this.fb.group({
            nomL: ['', [Validators.required, Validators.minLength(4)]],
            depL: ['', Validators.required],
        });
    }

    ngOnInit() {
        this.loadLignes();
        this.loadDeps();
        this.initLigne();
        if (this.tokenStorage.getToken()) {
            this.roles = this.tokenStorage.getAuthorities();
            const Swal = require('sweetalert2');
            var content = document.createElement('div');
            this.roles.every(role => {
                if (role === 'ROLE_ADMIN') {
                    this.authority = 'admin';
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
                return true;
            });
        }
    }

    loadLignes() {
        this.ligneService.getLignes().subscribe(
            data => {

                this.lignes = data;
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des lignes');
                console.log(this.lignes);
                console.log('liste des lignes', this.lignes);
            }
        );
    }

    loadDeps() {
        this.depService.getDepartements().subscribe(
            data => {
                this.deps = data
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des départements');
                console.log(this.deps)
            }
        );
    }

    addLigne() {
        var liste, texte;
        liste = document.getElementById("liste");
        texte = liste.options[liste.selectedIndex].text;
        console.log("model_ligne:" + texte);
        let indexDep = _.findIndex(this.deps, (o => {
            return o.nom == texte;
        }));

        this.newdep = this.deps[indexDep];
        this.ligneModel.idDepartement = this.newdep.idDepartement;
        this.ligneModel.nomLigne = this.ligneForm.controls['nomL'].value;

        console.log("index", indexDep);
        console.log("model", this.ligneModel);
        //dès qu'on crée la ligne on affiche immédiatement la liste
        this.ligneService.addLigne(this.ligneModel).subscribe(
            res => {

            },err =>{
                this.initLigne();
                this.loadLignes();
            }
        );
    }

    updateLigne() {
        var liste, texte;
        liste = document.getElementById("liste");
        texte = liste.options[liste.selectedIndex].text;
        console.log("model_ligne:" + texte);
        let indexDep = _.findIndex(this.deps, (o => {
            return o.nom == texte;
        }));

        this.newdep = this.deps[indexDep];
        this.ligneModel.idDepartement = this.newdep.idDepartement;
        this.ligneModel.nomLigne = this.ligneForm.controls['nomL'].value;
        this.ligneModel.idLigne= this.selectedLigne.idLigne;
        console.log("index", indexDep);
        console.log("models", this.ligneModel);
        console.log("idLigne", this.selectedLigne.idLigne);
        console.log("nom", this.selectedLigne.nomLigne);
        this.ligneService.updateLigne(this.ligneModel).subscribe(
            res => {
                this.initLigne();
                this.loadLignes();
            }
        );
    }

    initLigne() {
        this.selectedLigne = new Ligne();
        this.createForm();
    }

    deleteLigne() {
        this.ligneService.deleteLigne(this.selectedLigne.idLigne).subscribe(
            res => {
                this.selectedLigne = new Ligne();
                this.loadLignes();
            }
        );
    }
}
