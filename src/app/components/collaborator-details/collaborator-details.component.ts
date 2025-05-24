import { Component, computed, effect } from '@angular/core';
import { Collaborator } from '../../interfaces/collaborator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollaboratorsService } from '../../services/signals/collaborators.service';

@Component({
  selector: 'app-collaborator-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './collaborator-details.component.html',
  styleUrl: "./collaborator-details.component.css"
})
export class CollaboratorDetailsComponent {
  editMode = false;
  draft?: Collaborator;

  collaborator = computed(() => this.service.selectedSignal())

  constructor(private service: CollaboratorsService) {
  effect(() => {
    const c = this.collaborator();
    this.draft = c ? { ...c } : undefined;
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
