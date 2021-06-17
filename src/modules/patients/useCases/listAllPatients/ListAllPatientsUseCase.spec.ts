import { InMemoryPatientsRepository } from '../../repositories/in-memory/InMemoryPatientsRepository';
import { ListAllPatientsUseCase } from './ListAllPatientsUseCase';

let listAllPatientsUseCase: ListAllPatientsUseCase;
let inMemoryPatientsRepository: InMemoryPatientsRepository;

describe('ListAllPatientsUseCase', () => {
  beforeEach(() => {
    inMemoryPatientsRepository = new InMemoryPatientsRepository();

    listAllPatientsUseCase = new ListAllPatientsUseCase(
      inMemoryPatientsRepository
    );
  });

  it('should be able to list all patients', async () => {
    await inMemoryPatientsRepository.create({
      name: 'Darrin Koch III',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
    });

    await inMemoryPatientsRepository.create({
      name: 'Cathy Schultz',
      cpf: '32131231212',
      phone: '7489784292',
      address: '43898 Kattie Club',
    });

    const response = await listAllPatientsUseCase.execute();

    expect(response.length).toEqual(2);
    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Darrin Koch III',
          cpf: '12312312312',
          address: '4526 Mollie Motorway',
        }),
        expect.objectContaining({
          name: 'Cathy Schultz',
          cpf: '32131231212',
          phone: '7489784292',
          address: '43898 Kattie Club',
        }),
      ])
    );
  });
});
