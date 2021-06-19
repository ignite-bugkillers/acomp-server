import { InMemoryPatientsRepository } from '../../repositories/in-memory/InMemoryPatientsRepository';
import { ListPatientsUseCase } from './ListPatientsUseCase';

let listPatientsUseCase: ListPatientsUseCase;
let inMemoryPatientsRepository: InMemoryPatientsRepository;

describe('ListAllPatientsUseCase', () => {
  beforeEach(() => {
    inMemoryPatientsRepository = new InMemoryPatientsRepository();

    listPatientsUseCase = new ListPatientsUseCase(inMemoryPatientsRepository);
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

    const response = await listPatientsUseCase.execute({});

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

  it('should be able to list patients with filtrados por nome', async () => {
    await inMemoryPatientsRepository.create({
      name: 'Xuxa da Silva',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
      birth_date: new Date(
        'Thu Jul 30 2020 16:17:40 GMT-0300 (Brasilia Standard Time)'
      ),
    });

    await inMemoryPatientsRepository.create({
      name: 'Silva da Xuxa',
      cpf: '11122233344',
      address: '05805 Paucek Curve',
      birth_date: new Date(
        'Sun Oct 11 2020 20:37:35 GMT-0300 (Brasilia Standard Time)'
      ),
    });

    await inMemoryPatientsRepository.create({
      name: 'Chapolin Colorado',
      cpf: '99988877766',
      address: '09524 Nicolas Drives',
      birth_date: new Date(
        'Fri Nov 06 2020 15:56:59 GMT-0300 (Brasilia Standard Time)'
      ),
    });

    const patients = await listPatientsUseCase.execute({
      patient_name: 'silva',
    });

    expect(patients.length).toEqual(2);
    expect(patients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Xuxa da Silva',
          cpf: '12312312312',
          address: '4526 Mollie Motorway',
          birth_date: new Date(
            'Thu Jul 30 2020 16:17:40 GMT-0300 (Brasilia Standard Time)'
          ),
        }),
        expect.objectContaining({
          name: 'Silva da Xuxa',
          cpf: '11122233344',
          address: '05805 Paucek Curve',
          birth_date: new Date(
            'Sun Oct 11 2020 20:37:35 GMT-0300 (Brasilia Standard Time)'
          ),
        }),
      ])
    );
  });
});
