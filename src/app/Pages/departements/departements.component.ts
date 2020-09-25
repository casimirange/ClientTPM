import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Departement} from '../../Models/departement';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartementsService} from "../../services/departements/departements.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataModel} from "../../Models/data.model";

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

    constructor(private fb: FormBuilder, private departementService: DepartementsService, private route: ActivatedRoute, private router: Router) {
        this.createForm();
        this.fileForm();
        this.newDep = new Departement();
    }

    createForm() {
        this.depForm = this.fb.group({
            nom: ['', [Validators.required]],
            centre_cout: ['', [Validators.required]],
            responsable: ['', [Validators.required]]
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

         // this.departements = this.route.snapshot.data.departements;

        this.depModel = [
            new DataModel('id', 'ID', 'number'),
            new DataModel('nom', 'nom', 'String'),
            new DataModel('centre_cout', 'centre cout', 'String'),
            new DataModel('responsable', 'responsable', 'String'),
        ]
    }

    loadDepartements() {
        this.departementService.getDepartements().subscribe(
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

}
