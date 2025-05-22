import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CollaboratorsListBulletsComponent } from './collaborators-list-bullets/collaborators-list-bullets.component';
import {  signal, WritableSignal } from '@angular/core';
import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from './collaborator';
import { HolidayPlan } from './holiday-plan';
import { HolidayPlansService } from './holiday-plans.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let selectedCollab: WritableSignal<Collaborator | null>;
  let selectedHp: WritableSignal<HolidayPlan | null>;
  let editingHp: WritableSignal<HolidayPlan | null>;
  let collaborators: WritableSignal<Collaborator[]>;
  let mockCollabService: any;
  let mockHpService: any;

  beforeEach(async () => {
    collaborators = signal<Collaborator[]>([]);
    selectedCollab = signal<Collaborator | null>(null);
    selectedHp = signal<HolidayPlan | null>(null);
    editingHp = signal<HolidayPlan | null>(null);

    mockCollabService = {
      collaboratorsSignal: collaborators.asReadonly(),
      selectedSignal: selectedCollab.asReadonly(),
      loadCollaborators: (data: Collaborator[]) => collaborators.set(data),
      selectCollaborator: (c: Collaborator) => selectedCollab.set(c),
      updateCollaborator: (updated: Collaborator) => {
        const updatedList = collaborators().map(c => c.id === updated.id ? updated : c);
        collaborators.set(updatedList);
        selectedCollab.set(updated);
      }
    };

    mockHpService = {
      selectedSignal: selectedHp.asReadonly(),
      editingSignal: editingHp.asReadonly(),
      loadPlans: jasmine.createSpy('loadPlans').and.callFake((_plans: HolidayPlan[]) => {
        selectedHp.set(_plans[0] ?? null);
  }),
      updatePlan: jasmine.createSpy('updatePlan').and.callFake((plan: HolidayPlan) => {
        selectedHp.set(plan);
        editingHp.set(null);
      }),
      openEditor: jasmine.createSpy('openEditor').and.callFake(() => {
        editingHp.set(selectedHp());
      }),
      closeEditor: jasmine.createSpy('closeEditor').and.callFake(() => {
        editingHp.set(null);
      })
    }

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CollaboratorsListComponent,
        CollaboratorDetailsComponent,
        CollaboratorsListBulletsComponent
      ],
      providers: [
        { provide: CollaboratorsService, useValue: mockCollabService },
        { provide: HolidayPlansService, useValue: mockHpService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show details when a collaborator is selected', () => {
    const testCollaborator: Collaborator = {
      id: 1,
      name: 'Joao',
      surname: 'Silva',
      email: 'joao@email.com',
      initDate: new Date('2020-01-01'),
      endDate: new Date('2021-01-01')
    };

    mockCollabService.selectCollaborator(testCollaborator);
    fixture.detectChanges();

    expect(component.selectedCollabValue).toEqual(testCollaborator);

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

    mockCollabService.loadCollaborators([original]);
    mockCollabService.selectCollaborator(original);
    fixture.detectChanges();

    const updated: Collaborator = { ...original, name: 'Joazinho' };
    mockCollabService.updateCollaborator(updated);
    fixture.detectChanges();

    expect(component.selectedCollabValue!.name).toBe('Joazinho');
    expect(collaborators()[0].name).toBe('Joazinho');

    const element: HTMLElement = fixture.nativeElement;
    expect(element.textContent).toContain('Joazinho');
  });

  it('should show holiday periods when a holiday plan is selected', () => {
    selectedHp.set({
    id: 1,
    collaboratorId: 1,
    periods: [
      { id: 1, initDate: new Date('2024-07-01'), endDate: new Date('2024-07-15') }
    ]
    });

    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;~
    expect(content).toContain('Holiday Plan');
    expect(content).toContain('Jul 1, 2024');
    expect(content).toContain('Jul 15, 2024');
  })

  it('should show holiday editor when editingSignal is set', () => {
    editingHp.set({
      id: 1,
      collaboratorId: 1,
      periods: [
        { id: 1, initDate: new Date(), endDate: new Date() }
      ]
    });

    fixture.detectChanges();

    const content = fixture.nativeElement.textContent;
    expect(content).toContain('Edit Holiday Plan')
  })

  it('should update collaborator in the lists when updated', () => {
    const originalCollab: Collaborator = {
      id: 1,
    name: 'Joao',
    surname: 'Silva',
    email: 'joao@email.com',
    initDate: new Date('2020-01-01'),
    endDate: new Date('2022-01-01')
    };

    mockCollabService.loadCollaborators([originalCollab]);

    fixture.detectChanges();

    const updated: Collaborator = {... originalCollab, name: 'Joaozinho'};
    mockCollabService.updateCollaborator(updated);
    fixture.detectChanges();

    const listElement: HTMLElement = fixture.nativeElement;
    expect(listElement.textContent).toContain('Joaozinho');
  })

 it('should show the same collaborator names in both table and bullet list', () => {
  const testData: Collaborator[] = [
    {
      id: 1,
      name: 'Ana',
      surname: 'Oliveira',
      email: 'ana@exemplo.com',
      initDate: new Date(),
      endDate: new Date()
    },
    {
      id: 2,
      name: 'Carlos',
      surname: 'Santos',
      email: 'carlos@exemplo.com',
      initDate: new Date(),
      endDate: new Date()
    }
  ];

  mockCollabService.loadCollaborators(testData);
  fixture.detectChanges();

  const tableNameValues = Array.from(
    fixture.nativeElement.querySelectorAll('.collaborators-table tbody tr td:first-child')
  ).map(cell => (cell as HTMLElement).textContent?.trim());

  const bulletNames = Array.from(
    fixture.nativeElement.querySelectorAll('.collaborators-list li')
  ).map(li => {
    const text = (li as HTMLElement).textContent ?? '';
    const match = text.match(/Name:\s*(\w+)/);
    return match?.[1];
  });

  expect(tableNameValues).toEqual(bulletNames);
});




});
