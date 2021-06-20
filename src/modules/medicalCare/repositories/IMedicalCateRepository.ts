import { MedicalCare } from '../entities/MedicalCare';
import { ICreateMedicalCareDTO } from '../useCases/createMedicalCare/ICreateMedicalCareDTO';

export interface IMedicalCareRepository {
  create(data: ICreateMedicalCareDTO): Promise<MedicalCare>;
  findAllFromPatient(patient_id: string): Promise<MedicalCare[]>;
}
