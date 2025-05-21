import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorsListBulletsComponent } from './collaborators-list-bullets.component';

describe('CollaboratorsListBulletsComponent', () => {
  let component: CollaboratorsListBulletsComponent;
  let fixture: ComponentFixture<CollaboratorsListBulletsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollaboratorsListBulletsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollaboratorsListBulletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
