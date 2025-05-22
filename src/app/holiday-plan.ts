import { HolidayPeriod } from "./holiday-period";

export interface HolidayPlan {
  id: number;
  collaboratorId: number;
  periods: HolidayPeriod[];
}