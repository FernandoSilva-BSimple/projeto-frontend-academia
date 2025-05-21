import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsData } from './collaborators.data';
import { CollaboratorsListBulletsComponent } from './collaborators-list-bullets/collaborators-list-bullets.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CollaboratorsListComponent, CollaboratorDetailsComponent, CollaboratorsListBulletsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selected = computed(() => this.service.selectedSignal());

  constructor(public service: CollaboratorsService) {
    this.service.loadCollaborators(CollaboratorsData.collaborators);
  }
}
