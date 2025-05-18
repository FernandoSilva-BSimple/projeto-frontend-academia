import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-collaborators-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './collaborators-list.component.html'
})
export class CollaboratorsListComponent {
  @Input() collaborators: Collaborator[] = [];

  @Output() selectedCollaborator = new EventEmitter<Collaborator>();

  selectCollaborator(collaborator: Collaborator) {
    this.selectedCollaborator.emit(collaborator);
  }
}

