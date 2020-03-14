import {Departement} from "../Models/departement";
/**
 * Created by Casimir on 05/03/2020.
 */

export class Ligne {
    nomLigne?: string;
    idDepartement?: number;
    idLigne?: number;
    departement?: Departement;
    constructor( ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}
