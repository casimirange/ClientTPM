/**
 * Created by Casimir on 01/03/2020.
 */
import { Injectable } from '@angular/core';
import {Resolve} from "@angular/router";
import {DepartementsService} from "../../services/departements/departements.service";

@Injectable()
export class DepartementResolver implements Resolve<any>{

    constructor(private  departementService: DepartementsService){}

    resolve(){
        return this.departementService.getDepartements();
    }
}