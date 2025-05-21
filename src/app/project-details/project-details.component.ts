import { CommonModule } from '@angular/common';
import { Component, effect, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  editMode = false;
  draft?: Project;

  project = computed(() => this.service.selectedSignal())

  constructor(private service: ProjectsService){
    effect(() => {
      const p = this.project();
      this.draft = p ? { ...p } : undefined;
      this.editMode = false;
    });
  }

  enableEdit() {this.editMode = true};

  cancel() {this.editMode = false};

  save()
  {
    if(this.draft){
      this.service.updateProject(this.draft)
      this.editMode=false;
    }
  }
}
