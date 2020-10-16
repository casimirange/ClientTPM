import {Role} from "./roles";
/**
 * Created by Casimir on 11/04/2020.
 */

export class User {
    userId?: number;
    id?: number;
    fonction?: string;
    name?: string;
    prenom?: string;
    matricule?: number;
    username?: string;
    password?: string;
    email?: string;
    role?: Role;
    constructor(){}
}