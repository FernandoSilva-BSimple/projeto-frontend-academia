import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/signals/projects.service';
import { CollaboratorsService } from '../../services/signals/collaborators.service';
import { AssociationsService } from '../../services/signals/associations.service';

@Component({
  selector: 'app-association-project-collaborator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association-project-collaborator.component.html',
})
export class AssociationProjectCollaboratorComponent {
  projectAcronymsWithCollaborators = signal<{ acronym: string; collaborators: string[] }[]>([]);

  constructor(
    private projectsService: ProjectsService,
    private collaboratorsService: CollaboratorsService,
    private associationsService: AssociationsService
  ) {
    effect(() => {
      const associations = this.associationsService.associationsSignal();
      const projects = this.projectsService.projectsSignal();
      const collaborators = this.collaboratorsService.collaboratorsSignal();

      const result = projects.map(project => {
        const associationProject = associations.filter(a => a.projectId === project.id);
        const names = associationProject.map(a => {
          const collab = collaborators.find(c => c.id === a.collaboratorId);
          return collab ? collab.name : '—';
        });

        return { acronym: project.acronym, collaborators: names };
      });

      this.projectAcronymsWithCollaborators.set(result);
    });
  }
}