import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollaboratorsListComponent } from './components/collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './components/collaborator-details/collaborator-details.component';
import { CollaboratorsService } from './services/signals/collaborators.service';
import { CollaboratorsListBulletsComponent } from './components/collaborators-list-bullets/collaborators-list-bullets.component';
import { Collaborator } from './interfaces/collaborator';
import { effect } from '@angular/core';
import { ProjectsListComponent } from './components/projects-list-component/projects-list-component.component';
import { ProjectsService } from './services/signals/projects.service';
import { ProjectsData } from './services/data/project-data.service';
import { Project } from './interfaces/project';
import { ProjectDetailsComponent } from "./components/project-details/project-details.component";
import { HolidayPlansService } from './services/signals/holiday-plans.service';
import { HolidayPlansData } from './services/data/holiday-plans-data.service';
import { HolidayPlanDetailsComponent } from './components/holiday-plan-details/holiday-plan-details.component';
import { HolidayPlanEditorComponent } from './components/holiday-plan-editor/holiday-plan-editor.component';
import { AssociationProjectCollaboratorComponent } from './components/association-project-collaborator/association-project-collaborator.component';
import { AssociationsService } from './services/signals/associations.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CollaboratorsListComponent, CollaboratorDetailsComponent, CollaboratorsListBulletsComponent, ProjectsListComponent, ProjectDetailsComponent, HolidayPlanDetailsComponent, HolidayPlanEditorComponent, AssociationProjectCollaboratorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCollabValue: Collaborator | null = null;
  selectedProjectValue: Project | null = null;


  constructor(public collaboratorsService: CollaboratorsService, public projectsService: ProjectsService, public holidayPlansService: HolidayPlansService, public associationsService: AssociationsService) {
    this.collaboratorsService.loadCollaboratorsFromDataService();
    this.projectsService.loadProjects(ProjectsData.projects);
    this.holidayPlansService.loadPlans(HolidayPlansData.holidayPlans);
    this.associationsService.loadAssociationsFromDataService();

    effect(() => {
      this.selectedCollabValue = this.collaboratorsService.selectedSignal();
      this.selectedProjectValue = this.projectsService.selectedSignal();
    });
  }
}
