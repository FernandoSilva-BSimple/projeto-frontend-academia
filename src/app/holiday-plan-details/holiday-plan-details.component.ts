import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayPlansService } from '../holiday-plans.service';

@Component({
  selector: 'app-holiday-plan-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './holiday-plan-details.component.html'
})
export class HolidayPlanDetailsComponent {
  plan = computed(() => this.service.selectedSignal());

  constructor(private service: HolidayPlansService) {}

  edit() { this.service.openEditor(); }
}
