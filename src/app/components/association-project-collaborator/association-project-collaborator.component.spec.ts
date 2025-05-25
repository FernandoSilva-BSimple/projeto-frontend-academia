import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociationProjectCollaboratorComponent } from './association-project-collaborator.component';
import { AssociationsService } from '../../services/signals/associations.service';
import { ProjectsService } from '../../services/signals/projects.service';
import { CollaboratorsService } from '../../services/signals/collaborators.service';
import { signal, WritableSignal } from '@angular/core';
import { Association } from '../../interfaces/association';
import { Project } from '../../interfaces/project';
import { Collaborator } from '../../interfaces/collaborator';

describe('AssociationProjectCollaboratorComponent', () => {
  let fixture: ComponentFixture<AssociationProjectCollaboratorComponent>;
  let mockAssociations: WritableSignal<Association[]>;
  let mockProjects: WritableSignal<Project[]>;
  let mockCollaborators: WritableSignal<Collaborator[]>;

  beforeEach(async () => {
    mockAssociations = signal<Association[]>([
      { id: 1, projectId: 1, collaboratorId: 1, initDate: new Date(), endDate: new Date() }
    ]);

    mockProjects = signal<Project[]>([
      { id: 1, title: 'Project A', acronym: 'PA', initDate: new Date(), endDate: new Date() }
    ]);

    mockCollaborators = signal<Collaborator[]>([
      { id: 1, name: 'Ana', surname: 'Silva', email: 'ana@email.com', initDate: new Date(), endDate: new Date() }
    ]);

    await TestBed.configureTestingModule({
      imports: [AssociationProjectCollaboratorComponent],
      providers: [
        {
          provide: AssociationsService,
          useValue: {
            associationsSignal: mockAssociations.asReadonly()
          }
        },
        {
          provide: ProjectsService,
          useValue: {
            projectsSignal: mockProjects.asReadonly()
          }
        },
        {
          provide: CollaboratorsService,
          useValue: {
            collaboratorsSignal: mockCollaborators.asReadonly()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationProjectCollaboratorComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
