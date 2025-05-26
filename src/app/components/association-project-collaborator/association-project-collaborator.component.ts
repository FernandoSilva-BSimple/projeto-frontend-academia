import { Component, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Association } from '../../interfaces/association';
import { Collaborator } from '../../interfaces/collaborator';
import { Project } from '../../interfaces/project';
import { AssociationsService } from '../../services/signals/associations.service';
import { ProjectsService } from '../../services/signals/projects.service';
import { CollaboratorsService } from '../../services/signals/collaborators.service';

@Component({
  selector: 'app-association-project-collaborator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './association-project-collaborator.component.html',
})
export class AssociationProjectCollaboratorComponent {

  selectedCollaborator = signal<Collaborator | null>(null);
  selectedProject = signal<Project | null>(null);
  associations = signal<Association[]>([]);

  visible = signal(false);
  context = signal<'collaborator' | 'project' | null>(null);

  associatedProjects = computed(() => {

    const allProjects = this.projectsService.projectsSignal();

    return this.associations().map(assoc => {

      const project = allProjects.find(p => p.id === assoc.projectId);

      return {

        title: project?.title,
        acronym: project?.acronym,
        assocInitDate: assoc.initDate,
        assocEndDate: assoc.endDate,

      };
    });
  });

  associatedCollaborators = computed(() => {

    const allCollaborators = this.collaboratorsService.collaboratorsSignal();

    return this.associations().map(assoc => {

      const collab = allCollaborators.find(c => c.id === assoc.collaboratorId);

      return {

        name: collab?.name,
        surname: collab?.surname,
        assocInitDate: assoc.initDate,
        assocEndDate: assoc.endDate,

      };
    });
  });

  constructor(
    private associationsService: AssociationsService,
    private projectsService: ProjectsService,
    private collaboratorsService: CollaboratorsService
  ) {
    effect(() => {

      this.visible.set(this.associationsService.projectsModalVisibleSignal());
      this.context.set(this.associationsService.projectsModalContextSignal());
      this.associations.set(this.associationsService.filteredAssociationsSignal())

      this.context() === 'collaborator' ? this.selectedCollaborator.set(this.associationsService.selectedProjectsCollaboratorSignal())
                                        : this.selectedProject.set(this.associationsService.selectedCollaboratorsProjectSignal());

    });
  }

  close() {
    this.associationsService.closeProjectsModal();
  }
}
