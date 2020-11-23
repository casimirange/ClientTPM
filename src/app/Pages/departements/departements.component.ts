import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Departement} from '../../Models/departement';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartementsService} from "../../services/departements/departements.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataModel} from "../../Models/data.model";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-departements',
    templateUrl: './departements.component.html',
    styleUrls: ['./departements.component.css']
})
export class DepartementsComponent implements OnInit {

    departements: Departement[];

    heading = 'Départements';
    subheading = 'Gérez les départements dans l\'application';
    icon = 'fa fa-home icon-gradient bg-mixed-hopes';

    depForm: FormGroup;

    centres: any = ['B300', 'B304', 'B470', 'B510', 'B330'];

    operation: string = 'add';

    selectedDep: Departement;
    newDep: Departement;

    closeResult: string;

    fileForms: FormGroup;
    // @ViewChild('fileUploadInput', { static: true })fileUploadInput: any;

    // test: Pannes[];

    logObject: any;

    depModel: DataModel[];
    dataArray: any;
    private roles: string[];
    public authority: string;

    constructor(private fb: FormBuilder,
                private departementService: DepartementsService,
                private route: ActivatedRoute,
                private router: Router,
                private tokenStorage: TokenStorageService,private _location: Location) {
        this.createForm();
        this.fileForm();
        this.newDep = new Departement();
    }

    createForm() {
        this.depForm = this.fb.group({
            nom: ['', [Validators.required, Validators.minLength(5)]],
            // centre_cout: ['', [Validators.required, Validators.minLength(4)]],
            localisation: ['', [Validators.required, Validators.minLength(4)]],
            responsable: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    fileForm() {
        this.fileForms = this.fb.group({
            file: ['', [Validators.required]],
        });
    }


    ngOnInit() {
        this.loadDepartements();
        this.initDep();
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

    loadDepartements() {
        this.departementService.getAllDepartements().subscribe(
            data => {
                this.departements = data
            },
            error => {
                console.log('une erreur a été détectée!')
            },
            () => {
                console.log('chargement des départements');
                console.log(this.departements)
            }
        );
    }

    addDepartement() {
        this.newDep = this.depForm.value;
        // const d = this.depForm.value;
        // console.log(d);
        // var liste, texte;
        // liste = document.getElementById("cc");
        // texte = liste.options[liste.selectedIndex].text;
        // console.log("centre_de_cout:"+texte );
        // this.newDep.nom = this.depForm.controls['nom'].value;
        // this.newDep.responsable = this.depForm.controls['responsable'].value;
        // this.newDep.centre_cout = texte;
        // console.log("model",this.newDep);

        //dès qu'on crée le département on affiche immédiatement la liste
        this.departementService.addDep(this.newDep).subscribe(
            res => {
                this.initDep();
                this.loadDepartements();
            }
        );
    }

    updateDepartement() {
        // var liste, texte;
        // liste = document.getElementById("cc");
        // texte = liste.options[liste.selectedIndex].text;
        // console.log("centre_de_cout:"+texte );
        // this.selectedDep.nom = this.depForm.controls['nom'].value;
        // this.selectedDep.responsable = this.depForm.controls['responsable'].value;
        // this.selectedDep.centre_cout = texte;
        // console.log("model",this.newDep);
        this.departementService.updateDep(this.selectedDep).subscribe(
            res => {
                this.initDep();
                this.loadDepartements();
            }
        );
    }

    initDep() {
        this.selectedDep = new Departement();
        this.createForm();
    }

    deleteDepartement() {
        this.departementService.deleteDep(this.selectedDep.idDepartement).subscribe(
            res => {
                this.selectedDep = new Departement();
                this.loadDepartements();
            }
        );
    }

    swl(tec: Departement){
        const Swal = require('sweetalert2');
        Swal.fire({
            title: 'Spprimer',
            html: "Voulez-vous vraiment supprimer "+ tec.nom.toUpperCase().bold()+ " ?",
            icon: 'error',
            showCancelButton: true,
            footer: '<a >Cette action est irréversible</a>',
            confirmButtonColor: '#00ace6',
            cancelButtonColor: '#f65656',
            confirmButtonText: 'OUI',
            cancelButtonText: 'Annuler',
            allowOutsideClick: true,
            focusConfirm: false,
            focusCancel: false,
            focusDeny: true,
            showLoaderOnConfirm: true
        }).then((result) => {
            if (result.value) {
                this.deleteDepartement();
                Swal.fire({
                    // title: tec.etat == false ? 'Activation' : 'Désactivation',
                    html: 'Département supprimé avec succès!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        })
    }

}
