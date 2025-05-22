import { Component, computed, effect } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollaboratorsService } from '../collaborators.service';

@Component({
  selector: 'app-collaborator-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: "./collaborator-details.component.css"
})
export class CollaboratorDetailsComponent {
  editMode = false;
  draft?: Collaborator;

  collaborator: Collaborator | null = null;

  constructor(private service: CollaboratorsService) {
  effect(() => {
    this.collaborator = this.service.selectedSignal();
    this.draft = this.collaborator ? { ...this.collaborator } : undefined;
    this.editMode = false;
  });
}
    
  enableEdit() {this.editMode = true};

  cancel() {this.editMode = false};

  save()
  {
    if(this.draft){
      this.service.updateCollaborator(this.draft)
      this.editMode = false;
    }
   
  }
  
}
