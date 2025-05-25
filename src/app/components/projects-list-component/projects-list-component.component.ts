import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../../interfaces/project';
import { ProjectsService } from '../../services/signals/projects.service';
import { AssociationsService } from '../../services/signals/associations.service';

@Component({
  selector: 'app-projects-list-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-list-component.component.html',
  styleUrl: './projects-list-component.component.css'
})
export class ProjectsListComponent {
  projectsList = signal<Project[]>([]);

  constructor(private service: ProjectsService, private associationsService: AssociationsService){
    effect(() => {
      this.projectsList.set(this.service.projectsSignal());
    })
  }

  selectProject(project: Project){
    this.service.selectProject(project);
  }

  
    showCollaborators(project: Project){
      this.associationsService.selectCollaboratorsForProject(project);
    }
}
