import {Component, OnInit} from '@angular/core';
import {Departement} from '../../Models/departement';
import {DepartementMockService} from '../../services/departement.mock.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartementsService} from "../../services/departements.service";
import {ActivatedRoute, Router} from "@angular/router";

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

    constructor(private fb: FormBuilder, private departementService: DepartementsService, private route: ActivatedRoute, private router: Router) {
        this.createForm();
    }

    createForm() {
        this.depForm = this.fb.group({
            nom: ['', [Validators.required]],
            centre_cout: ['', [Validators.required]],
            responsable: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        // this.loadDepartements();
        this.initDep();
        this.departements = this.route.snapshot.data.departements;
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
                console.log('chargement des départements')
            }
        );
    }

    addDepartement() {
        const d = this.depForm.value;
        console.log(d);
        //dès qu'on crée le département on affiche immédiatement la liste
        this.departementService.addDep(d).subscribe(
            res => {
                this.initDep();
                this.loadDepartements();
            }
        );
    }

    updateDepartement() {
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
        this.departementService.deleteDep(this.selectedDep.centre_cout).subscribe(
            res => {
                this.selectedDep = new Departement();
                this.loadDepartements();
            }
        );
    }

}
