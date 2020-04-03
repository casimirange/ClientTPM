import DateTimeFormat = Intl.DateTimeFormat;
import {Machine} from "./machines";
import {Technicien} from "./techniciens";
import {Operateur} from "./operateurs";
/**
 * Created by Casimir on 14/03/2020.
 */

export class Pannes {
    cause?: string;
    details?: string;
    description?: string;
    date?: Date;
    idMachine?: number;
    heure_arret?: DateTimeFormat;
    debut_inter?: DateTimeFormat;
    fin_inter?: DateTimeFormat;
    machine?: Machine;
    technicien?: Technicien;
    operateur?: Operateur;
    numero?: number;
    etat?: boolean;
    constructor( ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}
