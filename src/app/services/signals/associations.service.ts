import { Injectable, signal } from '@angular/core';
import { Association } from '../../interfaces/association';
import { Collaborator } from '../../interfaces/collaborator';
import { Project } from '../../interfaces/project';
import { AssociationsDataService } from '../data/associations-data.service';

@Injectable({ providedIn: 'root' })
export class AssociationsService {
  private associations = signal<Association[]>([]);
  private filteredAssociations = signal<Association[]>([]);
  private selectedProjectsCollaborator = signal<Collaborator | null>(null);
  private selectedCollaboratorsProject = signal<Project | null>(null);
  private projectsModalVisible = signal(false);
  private projectsModalContext = signal<'collaborator' | 'project' | null>(null);

  readonly associationsSignal = this.associations.asReadonly();
  readonly filteredAssociationsSignal = this.filteredAssociations.asReadonly();
  readonly selectedProjectsCollaboratorSignal = this.selectedProjectsCollaborator.asReadonly();
  readonly selectedCollaboratorsProjectSignal = this.selectedCollaboratorsProject.asReadonly();
  readonly projectsModalVisibleSignal = this.projectsModalVisible.asReadonly();
  readonly projectsModalContextSignal = this.projectsModalContext.asReadonly();

  constructor(private dataService: AssociationsDataService) {}

  loadAssociationsFromDataService() {
    const data = this.dataService.getAssociations();
    this.associations.set(data.map(a => ({ ...a })));
  }

  selectAssociations(entity: Collaborator | Project, context: 'collaborator' | 'project'){

    this.projectsModalContext.set(context);
    this.openProjectsModal();

    if(context === 'collaborator'){
      const collaborator = entity as Collaborator;
      this.selectedProjectsCollaborator.set(collaborator);
      const filtered = this.associations().filter(a => a.collaboratorId === collaborator.id);
      this.filteredAssociations.set(filtered);
    } else {
      const project = entity as Project;
      this.selectedCollaboratorsProject.set(project);
      const filtered = this.associations().filter(a => a.projectId === project.id);
      this.filteredAssociations.set(filtered);
    }
  }

  openProjectsModal() {
    this.projectsModalVisible.set(true);
  }

  closeProjectsModal() {
    this.projectsModalVisible.set(false);
    this.projectsModalContext.set(null);
    this.selectedProjectsCollaborator.set(null);
    this.selectedCollaboratorsProject.set(null);
    this.filteredAssociations.set([]);

  }
}
