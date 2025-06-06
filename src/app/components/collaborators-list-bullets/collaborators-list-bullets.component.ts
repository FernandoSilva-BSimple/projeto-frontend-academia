import { Collaborator } from '../../interfaces/collaborator';
import { Component,  signal, effect} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsService } from '../../services/signals/collaborators.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-collaborators-list-bullets',
  imports: [CommonModule, RouterModule],
  templateUrl: './collaborators-list-bullets.component.html'
})
export class CollaboratorsListBulletsComponent {
  collaboratorsList = signal<Collaborator[]>([])

  constructor(private service : CollaboratorsService) {
    effect(() => {
      this.collaboratorsList.set(this.service.collaboratorsSignal());
    })
  }

  selectCollaborator(collaborator: Collaborator) {
    this.service.selectCollaborator(collaborator);
  }
}

