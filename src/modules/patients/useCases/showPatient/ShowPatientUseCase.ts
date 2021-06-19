import { inject, injectable } from 'tsyringe';

import { Patient } from '../../entities/Patient';
import { IPatientsRepository } from '../../repositories/IPatientsRepository';
import { IShowPatientDTO } from './IShowPatientDTO';
import { ShowPatientError } from './ShowPatientError';

@injectable()
export class ShowPatientUseCase {
  constructor(
    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute({ patient_id }: IShowPatientDTO): Promise<Patient> {
    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new ShowPatientError();
    }

    return patient;
  }
}
