import { Component, OnInit } from '@angular/core';
import {Departement} from '../../Models/departement';
import {DepartementMockService} from '../../services/departement.mock.service';

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

  constructor(private depService: DepartementMockService) {

  }

  ngOnInit() {
    this.departements = this.depService.getDepartements();
  }

}
