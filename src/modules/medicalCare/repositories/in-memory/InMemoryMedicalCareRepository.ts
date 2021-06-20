import { MedicalCare } from '../../entities/MedicalCare';
import { ICreateMedicalCareDTO } from '../../useCases/createMedicalCare/ICreateMedicalCareDTO';
import { IMedicalCareRepository } from '../IMedicalCateRepository';

export class InMemoryMedicalCareRepository implements IMedicalCareRepository {
  private medicalCareArray: MedicalCare[];

  constructor() {
    this.medicalCareArray = [];
  }

  public async create({
    doctor_id,
    patient_id,
    procedure_id,
    date,
    description,
  }: ICreateMedicalCareDTO): Promise<MedicalCare> {
    const medicalCare = new MedicalCare();

    Object.assign(medicalCare, {
      doctor_id,
      patient_id,
      procedure_id,
      date,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.medicalCareArray.push(medicalCare);

    return medicalCare;
  }
}
