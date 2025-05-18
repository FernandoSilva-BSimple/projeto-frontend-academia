import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { Collaborator } from './collaborator';
import { CollaboratorsData } from './collaborators.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CollaboratorsListComponent, CollaboratorDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  collaborators = CollaboratorsData.collaborators;
  selectedCollaborator?: Collaborator;

  showDetails(collaborator: Collaborator) {
    this.selectedCollaborator = collaborator;
  }

  updateCollaborator(updated: Collaborator)
  {
    this.collaborators = this.collaborators.map(c => c.id === updated.id ? updated : c)

    this.selectedCollaborator = updated;
  }
}
