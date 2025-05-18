import { Collaborator } from "./collaborator";

export class CollaboratorsData {
  static collaborators: Collaborator[] = [
    {
      id: 1,
      name: 'João',
      surname: 'Silva',
      email: 'joao.silva@example.com',
      initDate: new Date('2024-01-10'),
      endDate: new Date('2024-12-31')
    },
    {
      id: 2,
      name: 'Maria',
      surname: 'Oliveira',
      email: 'maria.oliveira@example.com',
      initDate: new Date('2023-05-01'),
      endDate: new Date('2024-05-01')
    },
    {
      id: 3,
      name: 'Carlos',
      surname: 'Santos',
      email: 'carlos.santos@example.com',
      initDate: new Date('2022-09-15'),
      endDate: new Date('2025-09-15')
    }
  ];
}
