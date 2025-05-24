import { Injectable } from '@angular/core';
import { Collaborator } from '../../interfaces/collaborator';

@Injectable({ providedIn: 'root' })
export class CollaboratorsDataService {
  getCollaborators(): Collaborator[] {
    return [
      {
        id: 1,
        name: 'João',
        surname: 'Silva',
        email: 'joao@email.com',
        initDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      },
      {
        id: 2,
        name: 'Maria',
        surname: 'Oliveira',
        email: 'maria@email.com',
        initDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      },
      {
        id: 3,
        name: 'Carlos',
        surname: 'Santos',
        email: 'carlos@email.com',
        initDate: new Date('2024-01-01'),
        endDate: new Date('2024-12-31')
      }
    ];
  }
}
