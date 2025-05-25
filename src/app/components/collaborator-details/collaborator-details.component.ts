import { Component, signal, effect } from '@angular/core';
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
  draft = signal<Collaborator | null>(null);

  collaborator = signal<Collaborator | null >(null);

  constructor(private service: CollaboratorsService) {
  effect(() => {
    this.collaborator.set(this.service.selectedSignal());
    this.draft.set(this.collaborator() ? { ...this.collaborator()! } : null);
    this.editMode = false;
  });
}
    
  enableEdit() {this.editMode = true};

  cancel() {this.editMode = false};

  save()
  {
    const draftValue = this.draft();
    if(draftValue){
      this.service.updateCollaborator(draftValue)
      this.editMode = false;
    }
   
  }
  
}
