import { InMemoryPatientsRepository } from '../../repositories/in-memory/InMemoryPatientsRepository';
import { UpdatePatientError } from './UpdatePatientError';
import { UpdatePatientUseCase } from './UpdatePatientUseCase';

let updatePatientUseCase: UpdatePatientUseCase;
let inMemoryPatientsRepository: InMemoryPatientsRepository;

describe('UpdatePatientUseCase', () => {
  beforeEach(() => {
    inMemoryPatientsRepository = new InMemoryPatientsRepository();

    updatePatientUseCase = new UpdatePatientUseCase(inMemoryPatientsRepository);
  });

  it('should be able to update patient', async () => {
    const { id } = await inMemoryPatientsRepository.create({
      name: 'Douglas Collins IV',
      birth_date: new Date(
        'Wed May 19 2021 01:59:45 GMT-0300 (Brasilia Standard Time)'
      ),
      address: '482 Taya Walks',
      cpf: '12312312312',
      phone: '875-761-7214',
    });

    const patient = await updatePatientUseCase.execute({
      id,
      name: 'Irvin Schamberger',
      birth_date: new Date(
        'Sat Jan 30 2021 13:20:18 GMT-0300 (Brasilia Standard Time)'
      ),
      address: '114 Schmeler Square',
      cpf: '12312312312',
      phone: '875-761-7214',
    });

    expect(patient).toMatchObject({
      id,
      name: 'Irvin Schamberger',
      birth_date: new Date(
        'Sat Jan 30 2021 13:20:18 GMT-0300 (Brasilia Standard Time)'
      ),
      address: '114 Schmeler Square',
      cpf: '12312312312',
      phone: '875-761-7214',
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
    });
  });

  it('should not be able to update patient with non existing patient', async () => {
    await expect(
      updatePatientUseCase.execute({
        id: 'non-existing-patient',
        name: 'Irvin Schamberger',
        birth_date: new Date(
          'Sat Jan 30 2021 13:20:18 GMT-0300 (Brasilia Standard Time)'
        ),
        address: '114 Schmeler Square',
        cpf: '12312312312',
        phone: '875-761-7214',
      })
    ).rejects.toEqual(new UpdatePatientError.PatientNotFound());
  });
});
