/**
 * Created by Casimir on 27/02/2020.
 */

import {Ligne} from "../Models/lignes";

export class Departement {

    constructor( public nom?: string,
    public centre_cout?: string,
    public responsable?: string,
    public columnName?: string,
    public columnReference?: string,
    public dataType?: string,
    public idDepartement?: number,
    public lignes?: Ligne,) {}
}
