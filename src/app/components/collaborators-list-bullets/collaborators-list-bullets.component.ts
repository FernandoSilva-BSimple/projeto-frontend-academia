import { Component,  computed} from '@angular/core';
import { Collaborator } from '../../interfaces/collaborator';
import { CommonModule } from '@angular/common';
import { CollaboratorsService } from '../../services/signals/collaborators.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-collaborators-list-bullets',
  imports: [CommonModule, RouterModule],
  templateUrl: './collaborators-list-bullets.component.html'
})
export class CollaboratorsListBulletsComponent {
  collaborators = computed(() => this.service.collaboratorsSignal());

  constructor(private service : CollaboratorsService) {}

  selectCollaborator(collaborator: Collaborator) {
    this.service.selectCollaborator(collaborator);
  }
}

