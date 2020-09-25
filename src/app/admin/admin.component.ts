import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Pannes} from "../Models/pannes";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  headings = 'Imports Fichier';
  subheadings = 'Gérez les arrêts machines ';
  icons = 'fa fa-clock fa-spin icon-gradient bg-mixed-hopes';

  test: Pannes[];

  constructor( private fb: FormBuilder,) {
  }

  ngOnInit() {
  }



}
