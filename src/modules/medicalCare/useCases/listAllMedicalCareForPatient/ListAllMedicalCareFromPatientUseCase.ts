import { inject, injectable } from 'tsyringe';

import { IMedicalCareRepository } from '../../repositories/IMedicalCateRepository';
import { IListAllMedicalCareFromPatientDTO } from './IListAllMedicalCareFromPatientDTO';

@injectable()
export class ListAllMedicalCareFromPatientUseCase {
  constructor(
    @inject('TypeormMedicalCareRepository')
    private medicalCareRepository: IMedicalCareRepository
  ) {}

  public async execute({ patient_id }: IListAllMedicalCareFromPatientDTO) {
    return this.medicalCareRepository.findAllFromPatient(patient_id);
  }
}
