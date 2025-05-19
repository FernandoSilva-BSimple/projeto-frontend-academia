import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';
import { CollaboratorDetailsComponent } from './collaborator-details/collaborator-details.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, CollaboratorsListComponent, CollaboratorDetailsComponent, AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedCollaborator when list emits', () => {
    
    const listComponent: CollaboratorsListComponent = fixture.debugElement.query(By.directive(CollaboratorsListComponent))?.componentInstance;

    const testCollaborator = { id: 1, name: 'Joao', surname: 'Silva', email: 'joao@email.com', initDate: new Date(), endDate: new Date() };
    listComponent.selectedCollaborator.emit(testCollaborator);
    fixture.detectChanges();

    expect(component.selected()).toEqual(testCollaborator);

    const detailsComponent: CollaboratorDetailsComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).componentInstance;

    expect(detailsComponent.collaborator).toEqual(testCollaborator);
  });

  it('should update collaborators signal and selected signal when service.updateCollaborator is called', () => {

    const original = {
    id: 1,
    name: 'Joao',
    surname: 'Silva',
    email: 'joao@email.com',
    initDate: new Date(),
    endDate: new Date()
  };
  component.service.loadCollaborators([original]);
  component.service.selectCollaborator(original);
  fixture.detectChanges();

  const updated = { ...original, name: 'Joazinho' };
  component.service.updateCollaborator(updated);
  fixture.detectChanges();

  expect(component.collaborators()[0].name).toBe('Joazinho');
  expect(component.selected()!.name).toBe('Joazinho');
});
});
