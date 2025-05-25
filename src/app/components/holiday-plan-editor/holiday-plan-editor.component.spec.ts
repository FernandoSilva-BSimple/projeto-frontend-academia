import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { HolidayPlanEditorComponent } from './holiday-plan-editor.component';
import { HolidayPlan } from '../../interfaces/holiday-plan';
import { HolidayPlansService } from '../../services/signals/holiday-plans.service';

describe('HolidayPlanEditorComponent', () => {
  let component: HolidayPlanEditorComponent;
  let fixture: ComponentFixture<HolidayPlanEditorComponent>;
  let editingSignal: WritableSignal<HolidayPlan | null>;
  let mockService: any;

  beforeEach(async () => {
    editingSignal = signal<HolidayPlan | null>(null);

    mockService = {
      editingSignal: editingSignal,
      updatePlan: jasmine.createSpy('updatePlan'),
      closeEditor: jasmine.createSpy('closeEditor')
    };

    await TestBed.configureTestingModule({
      imports: [HolidayPlanEditorComponent],
      providers: [
        { provide: HolidayPlansService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayPlanEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be rendered', () => {
    const title = fixture.nativeElement.querySelector('h3');
    expect(title).toBeNull();
    const text = fixture.nativeElement.textContent;
    expect(text).not.toContain('Edit Holiday Plan');
  })

  it('should have title HolidayPlan when selected hp', () => {
    editingSignal.set({
    id: 1,
    collaboratorId: 1,
    periods: [
      { id: 1, initDate: new Date('2024-06-01'), endDate: new Date('2024-06-15') }
    ]
  });

  fixture.detectChanges();
    const h3 = fixture.nativeElement.querySelector('h3');
    expect(h3?.textContent).toContain('Edit Holiday Plan');
  })

  it('should display existing holiday periods', () => {
    editingSignal.set({
      id: 1,
      collaboratorId: 1,
      periods: [
        { id: 1, initDate: new Date('2024-06-01'), endDate: new Date('2024-06-15') },
        { id: 2, initDate: new Date('2024-08-01'), endDate: new Date('2024-08-10') }
      ]
    });

    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input[type="date"]');
    expect(inputs.length).toBe(4);
  });

  it('should add a new period when "Add Period" is clicked', () => {
    editingSignal.set({
      id: 1,
      collaboratorId: 1,
      periods: []
    });

    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const addButton = buttons[0];    
    
    addButton.click();

    fixture.detectChanges();

    const inputs = fixture.nativeElement.querySelectorAll('input[type="date"]');
    expect(inputs.length).toBe(2);
  });

  it('should call updatePlan when Save is clicked', () => {
    editingSignal.set({
      id: 1,
      collaboratorId: 1,
      periods: [{ id: 1, initDate: new Date(), endDate: new Date() }]
    });

    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('button[type="submit"]');
    saveButton.click();

    expect(mockService.updatePlan).toHaveBeenCalledWith(component.draft());
  });

  it('should call closeEditor when Cancel is clicked', () => {
    editingSignal.set({
      id: 1,
      collaboratorId: 1,
      periods: [{ id: 1, initDate: new Date(), endDate: new Date() }]
    });

    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button[type="button"]');
    const cancelButton = buttons[buttons.length - 1];

    cancelButton.click();

    expect(mockService.closeEditor).toHaveBeenCalledWith();
  });
});
