import {Pannes} from "./pannes";
/**
 * Created by Casimir on 14/03/2020.
 */

export class Technicien {
    nom?: string;
    prenom?: string;
    fonction?: string;
    idTechnicien?: number;
    matricule?: number;
    // pannes?: Pannes;
    etat?: boolean;
    localisation?: string;
    constructor( ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}