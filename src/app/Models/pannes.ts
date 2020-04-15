import DateTimeFormat = Intl.DateTimeFormat;
import {Machine} from "./machines";
import {Technicien} from "./techniciens";
import {Operateur} from "./operateurs";
/**
 * Created by Casimir on 14/03/2020.
 */

export class Pannes {
    cause?: string;
    détails?: string;
    description?: string;
    date?: Date;
    idMachine?: number;
    heureArret?: Date;
    debutInter?: Date;
    finInter?: Date;
    // machine?: Machine;
    // technicien?: Technicien;
    // operateur?: Operateur;
    numero?: number;
    etat?: boolean;



    machine?: string;
    code?: string;

    // private Date date;
    // private int numero;
    // private String cause;
    // private String description;
    // private String détails;
    // private Date heureArret;
    // private Date debutInter;
    // private Date finInter;
    // private boolean etat;

    nomOP?: string;
    prenomOP?: string;
    matOp?: number;

    nomTec?: string;
    preTec?: string;
    matricule?: number;
    fonction?: string;

    constructor( ) {}
    // constructor(public nom?: string, public id_departement?: string, public id?: number ) {}
}
