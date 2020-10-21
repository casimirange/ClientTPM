// import DateTimeFormat = Intl.DateTimeFormat;
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
    idM?: number;
    heureArret?: Date;
    debutInter?: Date;
    finInter?: Date;
    heure_arret?: Date;
    debut_inter?: Date;
    fin_inter?: Date;
    numero?: string;
    etat?: boolean;
    cont?: boolean;
    quart?: number;
    id_panne?: number;


    machine?: string;
    code?: string;

    nomOP?: string;
    prenomOP?: string;
    matOP?: number;

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

    nbre?: number;
    dt?: number;
    wt?: number;
    ttr?: number;
    HT?: number;
    AT?: number;
    TDT?: number;
    MDT?: number;
    WT?: number;
    MTTR?: number;
    TTR?: number;
    dep?: string;
    idDepartement?: number;

    constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}
