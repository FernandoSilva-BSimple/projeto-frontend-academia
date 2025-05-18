import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CollaboratorsListComponent } from './collaborators-list.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('CollaboratorsListComponent', () => {
  let component: CollaboratorsListComponent;
  let fixture: ComponentFixture<CollaboratorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterModule, CollaboratorsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title Collaborators List' , () => 
    {
        const bannerElement : HTMLElement = fixture.nativeElement;
        const h = bannerElement.querySelector('h2')!;

        expect(h.textContent).toContain('Collaborators List');
    } )

    it('should have <table>', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const table = bannerElement.querySelector('table')!;
    expect(table).toBeTruthy();
  });

  it('shouldn´t have <td>', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelector('td')!;
    expect(td).toBeFalsy();
  });

   it('should have <td> with "John Doe" if setting the class property', async () => {

    component.collaborators = [
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
    },
    ];

    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[0].textContent).toEqual('Ana');
  });

  it('should have <td> with "Maria Nazaré"', async () => {

    const collaboratorsDouble = [
      { id: 3, name: 'Sandra' },
    ];
    
    fixture.componentRef.setInput('collaborators', collaboratorsDouble);

    fixture.detectChanges();
    
    const bannerElement: HTMLElement = fixture.nativeElement;
    const td = bannerElement.querySelectorAll('td')!;
    expect(td[0].textContent).toEqual('Sandra');
  });

  it('should have <td> with <button>', async () => {

    const collaboratorsDouble = [
      { id: 3, name: 'Maria' },
    ];
    
    fixture.componentRef.setInput('collaborators', collaboratorsDouble);

    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement;
    const button = bannerElement.querySelector('button')!;
    expect(button.textContent).toEqual('🔍');
  });

  

  it('should emit selectedCollaborator event when button is clicked', () => {
    const mockCollaborator = { id: 1, name: 'John', surname: 'Doe', email: 'john@example.com', initDate: new Date(), endDate: new Date() };
    component.collaborators = [mockCollaborator];
    fixture.detectChanges();

    spyOn(component.selectedCollaborator, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(component.selectedCollaborator.emit).toHaveBeenCalledWith(mockCollaborator);
  });
});
