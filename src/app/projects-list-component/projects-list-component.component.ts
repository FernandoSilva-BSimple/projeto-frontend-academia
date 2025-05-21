import { CommonModule } from '@angular/common';
import { Component, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Project } from '../project';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-list-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './projects-list-component.component.html',
  styleUrl: './projects-list-component.component.css'
})
export class ProjectsListComponent {
  projectsList: Project[] = [];

  constructor(private service: ProjectsService){
    effect(() => {
      this.projectsList = this.service.projectsSignal();
    })
  }

  selectProject(project: Project){
    this.service.selectProject(project);
  }
}
