import { Injectable, signal } from '@angular/core';
import { Project } from '../../interfaces/project';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private projects = signal<Project[]>([]);
  private selected = signal<Project | null>(null);

  readonly projectsSignal = this.projects.asReadonly();
  readonly selectedSignal = this.selected.asReadonly();

  loadProjects(data: Project[]) {
    const d = data.map(c => ({ ...c }));
    this.projects.set(d);
  }

  selectProject(project: Project) {
    this.selected.set(project);
  }

  updateProject(updated: Project) {
    const updatedList = this.projects().map(p =>
      p.id === updated.id ? updated : p
    );
    this.projects.set(updatedList);
    this.selected.set(updated);
  }
}
