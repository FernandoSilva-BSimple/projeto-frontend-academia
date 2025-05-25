import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorsListComponent } from './collaborators-list.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { Collaborator } from '../../interfaces/collaborator';
import { CollaboratorsService } from '../../services/signals/collaborators.service';

describe('CollaboratorsListComponent', () => {
  let component: CollaboratorsListComponent;
  let fixture: ComponentFixture<CollaboratorsListComponent>;
  let collaboratorsSignal: WritableSignal<Collaborator[]>;
  let mockService: any;

  beforeEach(async () => {
    collaboratorsSignal = signal<Collaborator[]>([]);

    mockService = {
      collaboratorsSignal: collaboratorsSignal.asReadonly(),
      selectCollaborator: jasmine.createSpy('selectCollaborator'),
      loadCollaboratorsFromDataService: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, CollaboratorsListComponent],
      providers: [
        { provide: CollaboratorsService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title Collaborators List', () => {
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain('Collaborators List');
  });

  it('should have <table>', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should not have <td> initially', () => {
    const td = fixture.nativeElement.querySelector('td');
    expect(td).toBeNull();
  });

  it('should show first collaborator name in <td>', () => {
    collaboratorsSignal.set([
      {
        id: 1,
        name: 'Ana',
        surname: 'Silva',
        email: 'ana@silva.com',
        initDate: new Date(),
        endDate: new Date()
      },
      {
        id: 2,
        name: 'Maria',
        surname: 'Pereira',
        email: 'maria@silva.com',
        initDate: new Date(),
        endDate: new Date()
      }
    ]);

    fixture.detectChanges();

    const tds = fixture.nativeElement.querySelectorAll('td');
    expect(tds[0].textContent).toContain('Ana');
  });

  it('should display "Sandra" in <td>', () => {
    collaboratorsSignal.set([
      { id: 3, name: 'Sandra', surname: '', email: '', initDate: new Date(), endDate: new Date() }
    ]);

    fixture.detectChanges();

    const td = fixture.nativeElement.querySelector('td');
    expect(td?.textContent).toContain('Sandra');
  });

  it('should have <button> with 🔍 symbol', () => {
    collaboratorsSignal.set([
      { id: 4, name: 'Maria', surname: '', email: '', initDate: new Date(), endDate: new Date() }
    ]);

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button?.textContent).toContain('🔍');
  });

  it('should call selectCollaborator when button is clicked', () => {
    const mockCollaborator: Collaborator = {
      id: 1,
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      initDate: new Date(),
      endDate: new Date()
    };

    collaboratorsSignal.set([mockCollaborator]);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(mockService.selectCollaborator).toHaveBeenCalledWith(mockCollaborator);
  });
});
