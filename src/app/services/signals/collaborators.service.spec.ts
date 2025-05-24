import { CollaboratorsService } from './collaborators.service';
import { CollaboratorsDataService } from '../data/collaborators-data.service';
import { Collaborator } from '../../interfaces/collaborator';

describe('CollaboratorsService', () => {
  let service: CollaboratorsService;
  let mockDataService: jasmine.SpyObj<CollaboratorsDataService>;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj('CollaboratorsDataService', ['getCollaborators']);
    service = new CollaboratorsService(mockDataService);
  });

  it('loadCollaboratorsFromDataService should load a cloned list immutably', () => {
    const original: Collaborator[] = [{ id: 1, name: 'A' } as any];
    mockDataService.getCollaborators.and.returnValue(original);

    service.loadCollaboratorsFromDataService();

    original[0].name = 'B';

    expect(service.collaboratorsSignal()[0].name).toBe('A');
  });

  it('selectCollaborator should expose same object via selectedSignal', () => {
    const c = { id: 2, name: 'B' } as any;
    service['collaborators'].set([c]);
    service.selectCollaborator(c);

    expect(service.selectedSignal()).toBe(c);
  });

  it('updateCollaborator should sync list and selected', () => {
    const c = { id: 3, name: 'C' } as any;
    service['collaborators'].set([c]);
    service.selectCollaborator(c);

    const updated = { ...c, name: 'C-Updated' };
    service.updateCollaborator(updated);

    expect(service.collaboratorsSignal()[0].name).toBe('C-Updated');
    expect(service.selectedSignal()!.name).toBe('C-Updated');
  });
});
