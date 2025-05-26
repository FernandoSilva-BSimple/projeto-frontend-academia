import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HolidayPlan } from '../../interfaces/holiday-plan';
import { HolidayPeriod } from '../../interfaces/holiday-period';
import { HolidayPlansService } from '../../services/signals/holiday-plans.service';

@Component({
  selector: 'app-holiday-plan-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-plan-editor.component.html'
})
export class HolidayPlanEditorComponent {
  editMode = signal(true);
  draft = signal<HolidayPlan | null>(null);

  constructor(private service: HolidayPlansService) {
    effect(() => {
      const plan = this.service.editingSignal();
      if (plan) {
        this.draft.set({
          ...plan,
          periods: plan.periods.map(period => ({
            ...period,
            initDate: this.formatDate(new Date(period.initDate)),
            endDate: this.formatDate(new Date(period.endDate)),
          })),
        });
        this.editMode.set(true);
      } else {
        this.draft.set(null);
        this.editMode.set(false);
      }
    });
  }

  add() {
    const current = this.draft();
    if (!current) return;
    const newPeriod: HolidayPeriod = {
      id: current.periods.length + 1,
      initDate: this.formatDate(new Date()),
      endDate: this.formatDate(new Date()),
    };
    this.draft.set({ ...current, periods: [...current.periods, newPeriod] });
  }

  save() {
    if (this.draft()) {
      this.service.updatePlan(this.draft()!);
      this.editMode.set(false);
    }
  }

  cancel() {
    this.service.closeEditor();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
