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
      birth_date: new Date(
        'Thu Jul 30 2020 16:17:40 GMT-0300 (Brasilia Standard Time)'
      ),
    });

    await inMemoryPatientsRepository.create({
      name: 'Cathy Schultz',
      cpf: '32131231212',
      phone: '7489784292',
      address: '43898 Kattie Club',
      birth_date: new Date(
        'Sat May 01 2021 21:51:40 GMT-0300 (Brasilia Standard Time)'
      ),
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
