import { InMemoryMedicalCareRepository } from '../../repositories/in-memory/InMemoryMedicalCareRepository';
import { ListAllMedicalCareFromPatientUseCase } from './ListAllMedicalCareFromPatientUseCase';

let listAllMedicalCareFromPatientUseCase: ListAllMedicalCareFromPatientUseCase;
let inMemoryMedicalCareRepository: InMemoryMedicalCareRepository;

describe('ListAllMedicalCareForPatientUseCase', () => {
  beforeEach(() => {
    inMemoryMedicalCareRepository = new InMemoryMedicalCareRepository();

    listAllMedicalCareFromPatientUseCase =
      new ListAllMedicalCareFromPatientUseCase(inMemoryMedicalCareRepository);
  });

  it('should be able to list all medical care for patient', async () => {
    const medicalCare = await listAllMedicalCareFromPatientUseCase.execute({
      patient_id: 'patient_id',
    });

    expect(medicalCare).toBeDefined();
  });
});
