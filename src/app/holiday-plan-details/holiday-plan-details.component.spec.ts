import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolidayPlanDetailsComponent } from './holiday-plan-details.component';
import { signal, WritableSignal } from '@angular/core';
import { HolidayPlan } from '../holiday-plan';
import { HolidayPlansService } from '../holiday-plans.service';

describe('HolidayPlanDetailsComponent', () => {
  let component: HolidayPlanDetailsComponent;
  let fixture: ComponentFixture<HolidayPlanDetailsComponent>;
  let selectedHp: WritableSignal<HolidayPlan | null>;
  let mockHpService: any;

  beforeEach(async () => {

    selectedHp = signal<HolidayPlan | null>(null);

    mockHpService = {
      selectedSignal: selectedHp.asReadonly(),
      openEditor: jasmine.createSpy('openEditor')
    };

    await TestBed.configureTestingModule({
      imports: [HolidayPlanDetailsComponent],
      providers: [
        {provide: HolidayPlansService, useValue: mockHpService}
      ]
      }).compileComponents();

    fixture = TestBed.createComponent(HolidayPlanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be rendered when no selected hp' , () => {

    const title = fixture.nativeElement.querySelector('h3');
    expect(title).toBeNull();
    const text = fixture.nativeElement.textContent;
    expect(text).not.toContain('Holiday Plan');
  })

  it('should have title HolidayPlan when selected hp', () => {
    selectedHp.set({
      id: 1,
      collaboratorId: 1,
      periods: [
        { id: 1, initDate: new Date('2024-07-01'), endDate: new Date('2024-07-15') },
        { id: 2, initDate: new Date('2024-12-24'), endDate: new Date('2025-01-02') }
      ]
    })

    fixture.detectChanges();

    const h2 = fixture.nativeElement.querySelector('h3');
    expect(h2?.textContent).toContain('Holiday Plan');
  })

  it('should display holiday periods when holiday plan is provided', () => {
    selectedHp.set({
      id: 1,
      collaboratorId: 1,
      periods: [
        { id: 1, initDate: new Date('2024-07-01'), endDate: new Date('2024-07-15') },
        { id: 2, initDate: new Date('2024-12-24'), endDate: new Date('2025-01-02') }
      ]
    })

    fixture.detectChanges();

    const detailsElements = fixture.nativeElement.querySelectorAll('ul li');
    expect(detailsElements.length).toBe(2);
    expect(detailsElements[0].textContent).toContain('Jul 1, 2024');
    expect(detailsElements[0].textContent).toContain('→');
    expect(detailsElements[0].textContent).toContain('Jul 15, 2024');
    expect(detailsElements[1].textContent).toContain('Dec 24, 2024');
    expect(detailsElements[1].textContent).toContain('→');
    expect(detailsElements[1].textContent).toContain('Jan 2, 2025');
  })

  it('should call openEditor when button is clicked', async () => {
    selectedHp.set({
      id: 1,
      collaboratorId: 1,
      periods: [
        { id: 1, initDate: new Date('2024-07-01'), endDate: new Date('2024-07-15') },
        { id: 2, initDate: new Date('2024-12-24'), endDate: new Date('2025-01-02') }
      ]
    });

    fixture.detectChanges();
    await fixture.whenStable();

    component.edit();
    fixture.detectChanges();
    await fixture.whenStable();

    const editSpy = mockHpService.openEditor;

    expect(editSpy).toHaveBeenCalledWith();
  })
});
