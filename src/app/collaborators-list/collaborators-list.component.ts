import { Component,  computed} from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { CollaboratorsService } from '../collaborators.service';
import { RouterModule } from '@angular/router';
import { effect } from '@angular/core';


@Component({
  selector: 'app-collaborators-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './collaborators-list.component.html'
})
export class CollaboratorsListComponent {
  collaboratorsList: Collaborator[] = [];

  constructor(private service: CollaboratorsService) {
    effect(() => {
      this.collaboratorsList = this.service.collaboratorsSignal();
    });
  }

  selectCollaborator(collaborator: Collaborator) {
    this.service.selectCollaborator(collaborator);
  }
}