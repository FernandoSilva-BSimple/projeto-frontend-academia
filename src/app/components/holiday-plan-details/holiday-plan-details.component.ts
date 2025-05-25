import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayPlansService } from '../../services/signals/holiday-plans.service';
import { HolidayPlan } from '../../interfaces/holiday-plan';

@Component({
  selector: 'app-holiday-plan-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-plan-details.component.html'
})
export class HolidayPlanDetailsComponent {
  plan = signal<HolidayPlan | null>(null);

  constructor(private service: HolidayPlansService) {
    effect(() => {
      this.plan.set(this.service.selectedSignal());
    })
  }

  edit() { this.service.openEditor(); }
}
