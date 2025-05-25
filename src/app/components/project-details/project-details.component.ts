import { CommonModule } from '@angular/common';
import { Component, effect, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../../interfaces/project';
import { ProjectsService } from '../../services/signals/projects.service';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  editMode = false;
  draft = signal<Project | null>(null);
  project = signal<Project | null>(null);

  constructor(private service: ProjectsService){
    effect(() => {
      this.project.set(this.service.selectedSignal());
    this.draft.set(this.project() ? { ...this.project()! } : null);
    this.editMode = false;
    });
  }

  enableEdit() {this.editMode = true};

  cancel() {this.editMode = false};

  save()
  {
    const draftValue = this.draft();
    if(draftValue){
      this.service.updateProject(draftValue)
      this.editMode = false;
    }
  }
}
