import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HolidayPlan } from '../holiday-plan';
import { HolidayPlansService } from '../holiday-plans.service';

@Component({
  selector: 'app-holiday-plan-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-plan-editor.component.html'
})
export class HolidayPlanEditorComponent {
  draft?: HolidayPlan;

  editing = computed(() => this.service.editingSignal());

  constructor(private service: HolidayPlansService) {
    effect(() => {
      const p = this.editing();
      this.draft = p ? {
        ...p,
        periods: p.periods.map(period => ({
          ...period,
        initDate: this.formatDate(new Date(period.initDate)),
        endDate: this.formatDate(new Date(period.endDate))
  }))
} : undefined;    });
  }

  add() {
    this.draft?.periods.push({
      id: this.draft?.periods.length + 1,
      initDate: new Date(),
      endDate: new Date()
    });
  }

  save(){ 
    if (this.draft) {
      this.service.updatePlan(this.draft);
    } 
  }

  cancel() { this.service.closeEditor(); }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
