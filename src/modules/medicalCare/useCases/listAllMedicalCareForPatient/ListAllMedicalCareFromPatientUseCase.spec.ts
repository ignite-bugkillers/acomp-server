import { InMemoryPatientsRepository } from '../../../patients/repositories/in-memory/InMemoryPatientsRepository';
import { InMemoryMedicalCareRepository } from '../../repositories/in-memory/InMemoryMedicalCareRepository';
import { ListAllMedicalCareFromPatientError } from './ListAllMedicalCareFromPatientError';
import { ListAllMedicalCareFromPatientUseCase } from './ListAllMedicalCareFromPatientUseCase';

let listAllMedicalCareFromPatientUseCase: ListAllMedicalCareFromPatientUseCase;
let inMemoryMedicalCareRepository: InMemoryMedicalCareRepository;
let inMemoryPatientsRepository: InMemoryPatientsRepository;

describe('ListAllMedicalCareForPatientUseCase', () => {
  beforeEach(() => {
    inMemoryMedicalCareRepository = new InMemoryMedicalCareRepository();
    inMemoryPatientsRepository = new InMemoryPatientsRepository();

    listAllMedicalCareFromPatientUseCase =
      new ListAllMedicalCareFromPatientUseCase(
        inMemoryMedicalCareRepository,
        inMemoryPatientsRepository
      );
  });

  it('should be able to list all medical care for patient', async () => {
    const { id: patient_id } = await inMemoryPatientsRepository.create({
      name: 'Percy Baumbach',
      address: '30730 Jacklyn Ways',
      birth_date: new Date(
        'Thu Nov 19 2020 02:19:22 GMT-0300 (Brasilia Standard Time)'
      ),
      cpf: '63477634778',
    });

    await inMemoryMedicalCareRepository.create({
      doctor_id: 'doctor_id',
      patient_id,
      procedure_id: 'procedure_id',
      date: new Date(
        'Wed Mar 23 2022 03:40:02 GMT-0300 (Brasilia Standard Time)'
      ),
      description:
        'Atque tempore labore ullam mollitia voluptatum consequatur.',
    });

    await inMemoryMedicalCareRepository.create({
      doctor_id: 'doctor_id',
      patient_id,
      procedure_id: 'procedure_id',
      date: new Date(
        'Sat Jul 31 2021 14:21:05 GMT-0300 (Brasilia Standard Time)'
      ),
      description:
        'Atque tempore labore ullam mollitia voluptatum consequatur.',
    });

    const medicalCare = await listAllMedicalCareFromPatientUseCase.execute({
      patient_id,
    });

    expect(medicalCare.length).toEqual(2);
  });

  it('should not be able to list all medical care for patient with non existing patient', async () => {
    await expect(
      listAllMedicalCareFromPatientUseCase.execute({
        patient_id: 'non-existing-patient-id',
      })
    ).rejects.toEqual(new ListAllMedicalCareFromPatientError());
  });
});
