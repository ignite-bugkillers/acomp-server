import { InMemoryPatientsRepository } from '../../repositories/in-memory/InMemoryPatientsRepository';
import { CreatePatientError } from './CreatePatientError';
import { CreatePatientUseCase } from './CreatePatientUseCase';

let createPatientUseCase: CreatePatientUseCase;
let inMemoryPatientsRepository: InMemoryPatientsRepository;

describe('CreatePatientUseCase', () => {
  beforeEach(() => {
    inMemoryPatientsRepository = new InMemoryPatientsRepository();

    createPatientUseCase = new CreatePatientUseCase(inMemoryPatientsRepository);
  });

  it('should be able to create new patient', async () => {
    const patient = await createPatientUseCase.execute({
      name: 'Darrin Koch III',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
    });

    expect(patient).toMatchObject({
      id: expect.any(String),
      name: 'Darrin Koch III',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to create new patient with same cpf from another', async () => {
    await inMemoryPatientsRepository.create({
      name: 'Darrin Koch III',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
    });

    await expect(
      createPatientUseCase.execute({
        name: 'Cathy Schultz',
        cpf: '12312312312',
        phone: '7489784292',
        address: '43898 Kattie Club',
      })
    ).rejects.toEqual(new CreatePatientError());
  });
});
