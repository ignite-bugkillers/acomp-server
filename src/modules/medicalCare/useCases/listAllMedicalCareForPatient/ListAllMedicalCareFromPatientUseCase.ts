import { inject, injectable } from 'tsyringe';

import { IPatientsRepository } from '../../../patients/repositories/IPatientsRepository';
import { IMedicalCareRepository } from '../../repositories/IMedicalCateRepository';
import { IListAllMedicalCareFromPatientDTO } from './IListAllMedicalCareFromPatientDTO';
import { ListAllMedicalCareFromPatientError } from './ListAllMedicalCareFromPatientError';

@injectable()
export class ListAllMedicalCareFromPatientUseCase {
  constructor(
    @inject('TypeormMedicalCareRepository')
    private medicalCareRepository: IMedicalCareRepository,

    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute({ patient_id }: IListAllMedicalCareFromPatientDTO) {
    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new ListAllMedicalCareFromPatientError();
    }

    return this.medicalCareRepository.findAllFromPatient(patient_id);
  }
}
