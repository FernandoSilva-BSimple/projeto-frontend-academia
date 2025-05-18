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

    expect(component.selectedCollaborator).toEqual(testCollaborator);

    const detailsComponent: CollaboratorDetailsComponent = fixture.debugElement.query(By.directive(CollaboratorDetailsComponent)).componentInstance;

    expect(detailsComponent.collaborator).toEqual(testCollaborator);
  });

  it('should update collaborators list and selectedCollaborator when updateCollaborator is called', () => {
    component.collaborators = [
      { id: 1, name: 'Joao', surname: 'Silva', email: 'joao@email.com', initDate: new Date(), endDate: new Date() }
    ];

    const updated = { id: 1, name: 'Joazinho', surname: 'Silva', email: 'joao@email.com', initDate: new Date(), endDate: new Date() };
    component.updateCollaborator(updated);

    expect(component.collaborators[0].name).toEqual('Joazinho');
    expect(component.selectedCollaborator).toEqual(updated);
  });
});
