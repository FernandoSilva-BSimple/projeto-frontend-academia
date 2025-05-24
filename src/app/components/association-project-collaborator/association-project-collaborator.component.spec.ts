import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationProjectCollaboratorComponent } from './association-project-collaborator.component';

describe('AssociationProjectCollaboratorComponent', () => {
  let component: AssociationProjectCollaboratorComponent;
  let fixture: ComponentFixture<AssociationProjectCollaboratorComponent>;

  beforeEach(async () => {
   await TestBed.configureTestingModule({
     imports: [AssociationProjectCollaboratorComponent]
     }).compileComponents();

    fixture = TestBed.createComponent(AssociationProjectCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
