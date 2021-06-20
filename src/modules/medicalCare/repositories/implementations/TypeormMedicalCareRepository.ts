import { getRepository, Repository } from 'typeorm';

import { MedicalCare } from '../../entities/MedicalCare';
import { ICreateMedicalCareDTO } from '../../useCases/createMedicalCare/ICreateMedicalCareDTO';
import { IMedicalCareRepository } from '../IMedicalCateRepository';

export class TypeormMedicalCareRepository implements IMedicalCareRepository {
  private repository: Repository<MedicalCare>;

  constructor() {
    this.repository = getRepository(MedicalCare);
  }

  public async findAllFromPatient(patient_id: string): Promise<MedicalCare[]> {
    return this.repository.find({
      where: { patient_id },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async create({
    doctor_id,
    patient_id,
    procedure_id,
    date,
    description,
  }: ICreateMedicalCareDTO): Promise<MedicalCare> {
    const medicalCare = this.repository.create({
      doctor_id,
      patient_id,
      procedure_id,
      date,
      description,
    });

    return this.repository.save(medicalCare);
  }
}
