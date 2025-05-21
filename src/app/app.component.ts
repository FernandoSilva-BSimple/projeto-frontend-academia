import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsData } from './collaborators.data';
import { CollaboratorsListBulletsComponent } from './collaborators-list-bullets/collaborators-list-bullets.component';
import { Collaborator } from './collaborator';
import { effect } from '@angular/core';
import { ProjectsListComponent } from './projects-list-component/projects-list-component.component';
import { ProjectsService } from './projects.service';
import { ProjectsData } from './project.data';
import { Project } from './project';
import { ProjectDetailsComponent } from "./project-details/project-details.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CollaboratorsListComponent, CollaboratorDetailsComponent, CollaboratorsListBulletsComponent, ProjectsListComponent, ProjectDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCollabValue: Collaborator | null = null;
  selectedProjectValue: Project | null = null;


  constructor(public collaboratorsService: CollaboratorsService, public projectsService: ProjectsService) {
    this.collaboratorsService.loadCollaborators(CollaboratorsData.collaborators);
    this.projectsService.loadProjects(ProjectsData.projects);

    effect(() => {
      this.selectedCollabValue = this.collaboratorsService.selectedSignal();
      this.selectedProjectValue = this.projectsService.selectedSignal();
    });
  }
}
