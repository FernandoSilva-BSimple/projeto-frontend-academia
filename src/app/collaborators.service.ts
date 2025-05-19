import { Injectable, signal } from '@angular/core';
import { Collaborator } from './collaborator';

@Injectable({ providedIn: 'root' })
export class CollaboratorsService {
  private collaborators = signal<Collaborator[]>([]);
  private selected = signal<Collaborator | null>(null);

  collaboratorsSignal = this.collaborators.asReadonly();
  selectedSignal = this.selected.asReadonly();

  loadCollaborators(data: Collaborator[]) {
    const d = data.map(c => ({ ...c }));
    this.collaborators.set(d);
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
