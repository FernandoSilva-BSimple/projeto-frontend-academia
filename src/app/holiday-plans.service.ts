import { Injectable, signal } from '@angular/core';
import { HolidayPlan } from './holiday-plan';

@Injectable({ providedIn: 'root' })
export class HolidayPlansService {
  private plans = signal<HolidayPlan[]>([]);
  private selected = signal<HolidayPlan | null>(null);
  private editing = signal<HolidayPlan | null>(null);

  readonly selectedSignal = this.selected.asReadonly();
  readonly editingSignal = this.editing.asReadonly();

  loadPlans(data: HolidayPlan[]) {
    const d = data.map(p => ({ ...p, periods: p.periods.map(pr => ({ ...pr })) }));
    this.plans.set(d);
  }

  selectPlanByCollaborator(collabId: number) {
    const plan = this.plans().find(p => p.collaboratorId === collabId) ?? { id: this.plans().length + 1, collaboratorId: collabId, periods: [] };
    this.selected.set(plan);
    this.editing.set(null);
  }

  openEditor()  { this.editing.set(this.selected()); }

  closeEditor() { this.editing.set(null); }

  updatePlan(updated: HolidayPlan) {

    const list = this.plans();
    const index  = list.findIndex(p => p.id === updated.id);

    if (index >= 0){
        list[index] = updated;
    } 
    else {
        list.push(updated);
    }        

    this.plans.set([...list]);
    this.selected.set(updated);
    this.closeEditor();
  }
}
