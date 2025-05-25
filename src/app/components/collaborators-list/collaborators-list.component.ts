import { Component,  signal} from '@angular/core';
import { Collaborator } from '../../interfaces/collaborator';
import { CommonModule } from '@angular/common';
import { CollaboratorsService } from '../../services/signals/collaborators.service';
import { RouterModule } from '@angular/router';
import { effect } from '@angular/core';
import { HolidayPlansService } from '../../services/signals/holiday-plans.service';

@Component({
  selector: 'app-collaborators-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './collaborators-list.component.html'
})
export class CollaboratorsListComponent {
  collaboratorsList = signal<Collaborator[]>([])

  constructor(private service: CollaboratorsService, private holidaysService: HolidayPlansService) {
    effect(() => {
      this.collaboratorsList.set(this.service.collaboratorsSignal());
    });
  }

  selectCollaborator(collaborator: Collaborator) {
    this.service.selectCollaborator(collaborator);
  }

  showHolidays(collaborator: Collaborator){
    this.holidaysService.selectPlanByCollaborator(collaborator.id);
  }
}