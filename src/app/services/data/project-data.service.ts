import { Project } from "../../interfaces/project";

export class ProjectsData {
  static projects: Project[] = [
    {
      id: 1,
      title: 'Projeto1',
      acronym: 'P1',
      initDate: new Date('2024-01-10'),
      endDate: new Date('2024-12-31')
    },
    {
      id: 2,
      title: 'Projeto2',
      acronym: 'P2',
      initDate: new Date('2024-01-10'),
      endDate: new Date('2024-12-31')
    },
    {
      id: 3,
      title: 'Projeto3',
      acronym: 'P3',
      initDate: new Date('2024-01-10'),
      endDate: new Date('2024-12-31')
    },
  ];
}