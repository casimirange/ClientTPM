import DateTimeFormat = Intl.DateTimeFormat;
import {Machine} from "./machines";
import {Technicien} from "./techniciens";
import {Operateur} from "./operateurs";
import DateTimeFormat = Intl.DateTimeFormat;
/**
 * Created by Casimir on 14/03/2020.
 */

export class Pannes {
    cause?: string;
    details?: string;
    description?: string;
    date?: string;
    idMachine?: number;
    heureArret?: string;
    debutInter?: string;
    finInter?: string;
    numero?: number;
    etat?: boolean;



    machine?: string;
    code?: string;

    nomOP?: string;
    prenomOP?: string;
    matOp?: number;

    idOperateur?: number;
    idTechnicien?: number;
    idT?: number[];

    nomTec?: string;
    preTec?: string;
    matricule?: number;
    fonction?: string;

    outil?: string;
    ref?: string;
    qte?: number;

    constructor( ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}
