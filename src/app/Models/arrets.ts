import DateTimeFormat = Intl.DateTimeFormat;
/**
 * Created by Casimir on 12/05/2020.
 */
export class Arrets {
    cause?: string;
    date?: string;
    idMachine?: number;
    id_machine?: number;
    idArret?: number;
    debutArret?: DateTimeFormat;
    finArret?: DateTimeFormat;
    debut_arret?: DateTimeFormat;
    fin_arret?: Date;
    numero?: string;
    etat?: boolean;
    machine?: string;
    code?: string;

    constructor( ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}
