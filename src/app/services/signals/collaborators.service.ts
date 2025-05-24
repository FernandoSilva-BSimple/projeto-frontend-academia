import { Injectable, signal } from '@angular/core';
import { Collaborator } from '../../interfaces/collaborator';
import { CollaboratorsDataService } from '../data/collaborators-data.service';

@Injectable({ providedIn: 'root' })
export class CollaboratorsService {
  private collaborators = signal<Collaborator[]>([]);
  private selected = signal<Collaborator | null>(null);

  readonly collaboratorsSignal = this.collaborators.asReadonly();
  readonly selectedSignal = this.selected.asReadonly();

  constructor(private dataService: CollaboratorsDataService) {}

  loadCollaboratorsFromDataService() {
    const data = this.dataService.getCollaborators();
    this.collaborators.set(data.map(c => ({ ...c })));
  }

  selectCollaborator(collaborator: Collaborator) {
    this.selected.set(collaborator);
  }

  updateCollaborator(updated: Collaborator) {
    const updatedList = this.collaborators().map(c =>
      c.id === updated.id ? updated : c
    );
    this.collaborators.set(updatedList);
    this.selected.set(updated);
  }
}
