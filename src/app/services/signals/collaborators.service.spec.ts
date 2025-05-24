import { CollaboratorsService } from './collaborators.service';
import { Collaborator } from '../../interfaces/collaborator';

describe('CollaboratorsService', () => {
  let service: CollaboratorsService;

  beforeEach(() => service = new CollaboratorsService());

  it('loadCollaborators should replace the list immutably', () => {
    const original: Collaborator[] = [{ id: 1, name: 'A' } as any];
    service.loadCollaborators(original);

    original[0].name = 'B';

    expect(service.collaboratorsSignal()[0].name).toBe('A');
  });

  it('selectCollaborator should expose same object via selectedSignal', () => {
    const c = { id: 2, name: 'B' } as any;
    service.loadCollaborators([c]);
    service.selectCollaborator(c);

    expect(service.selectedSignal()).toBe(c);
  });

  it('updateCollaborator should sync list e selected', () => {
    const c = { id: 3, name: 'C' } as any;
    service.loadCollaborators([c]);
    service.selectCollaborator(c);

    const updated = { ...c, name: 'C-Updated' };
    service.updateCollaborator(updated);

    expect(service.collaboratorsSignal()[0].name).toBe('C-Updated');
    expect(service.selectedSignal()!.name).toBe('C-Updated');
  });
});
