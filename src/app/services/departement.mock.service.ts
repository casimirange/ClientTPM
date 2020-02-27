import { Injectable } from '@angular/core';
import {Departement} from '../Models/departement';

@Injectable()
export class DepartementMockService {

  private DEPARTEMENTS: Departement[] = [];

  constructor() {
    let d1: Departement = new Departement('Brazil', 'B350', 'BCB', 'Ivan POMPEI');
    let d2: Departement = new Departement('Contreplaqué', 'B520', 'BCC', 'Kevin');
    let d3: Departement = new Departement('Placage', 'B300', 'BCP', 'Bassa Amanganga');
    let d4: Departement = new Departement('Scierie', 'B450', 'BCS', 'Victor Saa');
    this.DEPARTEMENTS.push(d1);
    this.DEPARTEMENTS.push(d2);
    this.DEPARTEMENTS.push(d3);
    this.DEPARTEMENTS.push(d4);
  }

  public getDepartements(): Departement[] {
    return this.DEPARTEMENTS;
  }
}
