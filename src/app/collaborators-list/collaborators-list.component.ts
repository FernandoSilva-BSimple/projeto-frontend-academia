import { Component, EventEmitter, Output, Input, computed} from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { CollaboratorsService } from '../collaborators.service';

@Component({
  selector: 'app-collaborators-list',
  imports: [CommonModule],
  templateUrl: './collaborators-list.component.html'
})
export class CollaboratorsListComponent {
  collaborators = computed(() => this.service.collaboratorsSignal());

  constructor(private service : CollaboratorsService) {}

  selectCollaborator(collaborator: Collaborator) {
    this.service.selectCollaborator(collaborator);
  }
}

