import { Component, computed, effect, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HolidayPlan } from '../../interfaces/holiday-plan';
import { HolidayPlansService } from '../../services/signals/holiday-plans.service';
import { HolidayPeriod } from '../../interfaces/holiday-period';

@Component({
  selector: 'app-holiday-plan-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './holiday-plan-editor.component.html'
})
export class HolidayPlanEditorComponent {
  draft = signal<HolidayPlan | null>(null);

  editing = computed(() => this.service.editingSignal());

  constructor(private service: HolidayPlansService) {
    effect(() => {
      const p = this.editing();
      if (p) {
        this.draft.set({
          ...p,
          periods: p.periods.map((period: HolidayPeriod) => ({
            ...period,
            initDate: this.formatDate(new Date(period.initDate)),
            endDate: this.formatDate(new Date(period.endDate))
          }))
        });
      } else {
        this.draft.set(null);
      }
    });
  }

  add() {
    const current = this.draft();
    if (!current) return;

    const newPeriod: HolidayPeriod = {
      id: current.periods.length + 1,
      initDate: this.formatDate(new Date()),
      endDate: this.formatDate(new Date())
    };

    this.draft.set({
      ...current,
      periods: [...current.periods, newPeriod]
    });
  }

  save() {
    const current = this.draft();
    if (current) {
      this.service.updatePlan(current);
    }
  }

  updatePeriod(index: number, field: 'initDate' | 'endDate', value: string) {
  const current = this.draft();
  if (!current) return;

  const updatedPeriods = current.periods.map((period, i) =>
    i === index ? { ...period, [field]: value } : period
  );

  this.draft.set({ ...current, periods: updatedPeriods });
}


  cancel() {
    this.service.closeEditor();
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
