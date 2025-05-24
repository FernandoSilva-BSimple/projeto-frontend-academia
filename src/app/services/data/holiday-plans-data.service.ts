import { HolidayPlan } from "../../interfaces/holiday-plan";

export class HolidayPlansData {
  static holidayPlans: HolidayPlan[] = [
    {
      id: 1,
      collaboratorId: 1,
      periods: [
        { id: 1, initDate: new Date('2024-07-01'), endDate: new Date('2024-07-15') },
        { id: 2, initDate: new Date('2024-12-24'), endDate: new Date('2025-01-02') }
      ]
    },
    {
      id: 2,
      collaboratorId: 2,
      periods: [
        { id: 3, initDate: new Date('2024-08-05'), endDate: new Date('2024-08-19') }
      ]
    },
    {
      id: 3,
      collaboratorId: 3,
      periods: []
    }
  ];
}