import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorDetailsComponent } from './collaborator-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { signal, WritableSignal } from '@angular/core';
import { Collaborator } from '../collaborator';
import { CollaboratorsService } from '../collaborators.service';

describe('CollaboratorDetailsComponent', () => {
  let component: CollaboratorDetailsComponent;
  let fixture: ComponentFixture<CollaboratorDetailsComponent>;
  let selected: WritableSignal<Collaborator | null>;
  let mockService: any;


  beforeEach(async () => {
  selected = signal<Collaborator | null>(null);

  mockService = {
    selectedSignal: selected.asReadonly(), 
    updateCollaborator: jasmine.createSpy('updateCollaborator')
  };

  await TestBed.configureTestingModule({
    imports: [CommonModule, FormsModule, CollaboratorDetailsComponent],
    providers: [
      { provide: CollaboratorsService, useValue: mockService }
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(CollaboratorDetailsComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should have <p> with "Select a collaborator!" if no collaborator is provided', () => {
    const bannerElement : HTMLElement = fixture.nativeElement;
    const p = bannerElement.querySelector('p')!;

    expect(p.textContent).toContain('Select a collaborator!');
  });
  */

  it('shouldn´t have <form>', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const form = bannerElement.querySelector('form')!;
    expect(form).toBeFalsy();
  });

  it('should display collaborator details when collaborator is provided', () => {
      selected.set({
      id: 1,
      name: 'Pedro',
      surname: 'Silva',
      email: 'pedro@email.com',
      initDate: new Date('2020-01-01'),
      endDate: new Date('2022-01-01')
    })


    fixture.detectChanges();

    const detailsElements = fixture.nativeElement.querySelectorAll('.details-item');

    expect(detailsElements[0].textContent).toContain('Pedro');
    expect(detailsElements[1].textContent).toContain('Silva');
    expect(detailsElements[2].textContent).toContain('pedro@email.com');
    expect(detailsElements[3].textContent).toContain('Jan 1, 2020');  
    expect(detailsElements[4].textContent).toContain('Jan 1, 2022');  
  });

  it('should switch to edit mode when Edit button is clicked', async () => {
    
      selected.set({
      id: 2,
      name: 'Ana',
      surname: 'Silva',
      email: 'ana@silva.com',
      initDate: new Date(),
      endDate: new Date()
    });

    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('button'));
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.editMode).toBeTrue();
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should switch back to no edit mode when we click button cancel', async () => {
    selected.set({
      id: 2,
      name: 'Ana',
      surname: 'Silva',
      email: 'ana@silva.com',
      initDate: new Date(),
      endDate: new Date()
    });

    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('button'));
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const cancelButton = buttons[1];

    cancelButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.editMode).toBeFalse();
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();
  })

  it('should have <form> with "Tiago Silva" values if setting the class property', async () => {
  selected.set ({
    id: 1,
    name: 'Tiago',
    surname: 'Silva',
    email: 'tiago@silva.com',
    initDate: new Date('2020-01-01'),
    endDate: new Date('2022-01-01')
  });

  fixture.detectChanges();
  await fixture.whenStable();

  component.enableEdit();
  fixture.detectChanges();
  await fixture.whenStable();

  const bannerElement: HTMLElement = fixture.nativeElement;
  const forms = bannerElement.querySelectorAll('form');
  const inputs = bannerElement.querySelectorAll('input');

  expect(forms.length).toEqual(1);
  expect(inputs[0].value).toEqual('Tiago');
  expect(inputs[1].value).toEqual('Silva');
  expect(inputs[2].value).toEqual('tiago@silva.com');
});

  it('should call updateCollaborator when Save is clicked', async () => {
  selected.set({
    id: 3,
    name: 'Paula',
    surname: 'Ramos',
    email: 'paula@email.com',
    initDate: new Date(),
    endDate: new Date()
  });

  fixture.detectChanges();
  await fixture.whenStable();

  component.enableEdit();
  fixture.detectChanges();
  await fixture.whenStable();

  const updateSpy = mockService.updateCollaborator;

  const form = fixture.debugElement.query(By.css('form'));
  form.triggerEventHandler('ngSubmit', {});
  fixture.detectChanges();

  expect(updateSpy).toHaveBeenCalledWith(component.draft);
});

});
