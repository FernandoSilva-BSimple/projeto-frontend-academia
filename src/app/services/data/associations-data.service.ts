import { Injectable } from '@angular/core';
import { Association } from "../../interfaces/association";

@Injectable({ providedIn: 'root' })
export class AssociationsDataService {
  getAssociations(): Association[] {
    return [
      { id: 1, projectId: 1, collaboratorId: 1, initDate: new Date('2024-01-01'), endDate: new Date('2024-06-30') },
    { id: 2, projectId: 1, collaboratorId: 2, initDate: new Date('2024-03-01'), endDate: new Date('2024-12-31') },
    { id: 3, projectId: 2, collaboratorId: 1, initDate: new Date('2024-07-01'), endDate: new Date('2024-12-31') },
    { id: 4, projectId: 3, collaboratorId: 3, initDate: new Date('2024-01-15'), endDate: new Date('2024-12-31') },
    ];
  }
}

