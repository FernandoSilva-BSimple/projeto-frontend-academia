import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaborator-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: "./collaborator-details.component.css"
})
export class CollaboratorDetailsComponent implements OnChanges{
  @Input() collaborator?: Collaborator;
  @Output() collaboratorUpdated = new EventEmitter<Collaborator>();

  editMode = false;
  draft?: Collaborator;

  ngOnChanges() {
    this.draft = this.collaborator ? {...this.collaborator} : undefined;
  }

  enableEdit() {this.editMode = true};

  cancel() {this.editMode = false};

  save()
  {
    this.collaboratorUpdated.emit(this.draft);
    this.editMode = false;
  }
  
}
