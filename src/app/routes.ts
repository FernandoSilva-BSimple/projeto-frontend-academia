import { Routes } from '@angular/router';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';

export const routes: Routes = [
  { path: '', component: CollaboratorsListComponent },
  { path: 'collaborators/:id', component: CollaboratorDetailsComponent }
];
