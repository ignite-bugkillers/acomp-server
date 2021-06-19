import { InMemoryPatientsRepository } from '../../repositories/in-memory/InMemoryPatientsRepository';
import { ShowPatientError } from './ShowPatientError';
import { ShowPatientUseCase } from './ShowPatientUseCase';

let showPatientUseCase: ShowPatientUseCase;
let inMemoryPatientRepository: InMemoryPatientsRepository;

describe('ShowPatientUseCase', () => {
  beforeEach(() => {
    inMemoryPatientRepository = new InMemoryPatientsRepository();

    showPatientUseCase = new ShowPatientUseCase(inMemoryPatientRepository);
  });

  it('should be able to show the patient', async () => {
    const { id } = await inMemoryPatientRepository.create({
      name: 'Darrin Koch III',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
      birth_date: new Date(
        'Sat Dec 12 2020 08:06:08 GMT-0300 (Brasilia Standard Time)'
      ),
    });

    const patient = await showPatientUseCase.execute({ patient_id: id });

    expect(patient).toMatchObject({
      id,
      name: 'Darrin Koch III',
      cpf: '12312312312',
      address: '4526 Mollie Motorway',
      birth_date: new Date(
        'Sat Dec 12 2020 08:06:08 GMT-0300 (Brasilia Standard Time)'
      ),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to show the patient with non existing patient', async () => {
    await expect(
      showPatientUseCase.execute({
        patient_id: 'non-existing-patient-id',
      })
    ).rejects.toEqual(new ShowPatientError());
  });
});
