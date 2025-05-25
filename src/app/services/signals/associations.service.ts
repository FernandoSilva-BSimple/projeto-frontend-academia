import { Injectable, signal } from "@angular/core";
import { Association } from "../../interfaces/association";
import { AssociationsDataService } from "../data/associations-data.service";

@Injectable({providedIn: 'root'})
export class AssociationsService {
    private associations = signal<Association[]>([]);
    
    readonly associationsSignal = this.associations.asReadonly();

    constructor(private dataService: AssociationsDataService){}

    loadAssociationsFromDataService(){
        const data = this.dataService.getAssociations();
        this.associations.set(data.map(a => ({...a})));
    }
}
