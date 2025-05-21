import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorsListBulletsComponent } from './collaborators-list-bullets/collaborators-list-bullets.component';
import {  signal, WritableSignal } from '@angular/core';
import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from './collaborator';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let selected: WritableSignal<Collaborator | null>;
  let collaborators: WritableSignal<Collaborator[]>;
  let mockService: any;

  beforeEach(async () => {
    collaborators = signal<Collaborator[]>([]);
    selected = signal<Collaborator | null>(null);

    mockService = {
      collaboratorsSignal: collaborators.asReadonly(),
      selectedSignal: selected.asReadonly(),
      loadCollaborators: (data: Collaborator[]) => collaborators.set(data),
      selectCollaborator: (c: Collaborator) => selected.set(c),
      updateCollaborator: (updated: Collaborator) => {
        const updatedList = collaborators().map(c => c.id === updated.id ? updated : c);
        collaborators.set(updatedList);
        selected.set(updated);
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CollaboratorsListComponent,
        CollaboratorDetailsComponent,
        CollaboratorsListBulletsComponent
      ],
      providers: [
        { provide: CollaboratorsService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show details when a collaborator is selected via service', () => {
    const testCollaborator: Collaborator = {
      id: 1,
      name: 'Joao',
      surname: 'Silva',
      email: 'joao@email.com',
      initDate: new Date('2020-01-01'),
      endDate: new Date('2021-01-01')
    };

    // Simula seleção via serviço
    mockService.selectCollaborator(testCollaborator);
    fixture.detectChanges();

    // Verifica que o signal no componente refletiu
    expect(component.selectedValue).toEqual(testCollaborator);

    const detailElement: HTMLElement = fixture.nativeElement;
    expect(detailElement.textContent).toContain('Joao');
  });

  it('should update collaborator name after updateCollaborator is called', () => {
    const original: Collaborator = {
      id: 1,
      name: 'Joao',
      surname: 'Silva',
      email: 'joao@email.com',
      initDate: new Date(),
      endDate: new Date()
    };

    mockService.loadCollaborators([original]);
    mockService.selectCollaborator(original);
    fixture.detectChanges();

    const updated: Collaborator = { ...original, name: 'Joazinho' };
    mockService.updateCollaborator(updated);
    fixture.detectChanges();

    expect(component.selectedValue!.name).toBe('Joazinho');
    expect(collaborators()[0].name).toBe('Joazinho');

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Joazinho');
  });
});
