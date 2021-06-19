import { inject, injectable } from 'tsyringe';

import { Patient } from '../../entities/Patient';
import { IPatientsRepository } from '../../repositories/IPatientsRepository';
import { IUpdatedPatientDTO } from './IUpdatePatientDTO';
import { UpdatePatientError } from './UpdatePatientError';

@injectable()
export class UpdatePatientUseCase {
  constructor(
    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute({
    id,
    name,
    cpf,
    birth_date,
    address,
    phone,
  }: IUpdatedPatientDTO): Promise<Patient> {
    const patient = await this.patientsRepository.findById(id);

    if (!patient) {
      throw new UpdatePatientError.PatientNotFound();
    }

    Object.assign(patient, {
      name,
      cpf,
      birth_date,
      address,
      phone,
    });

    return this.patientsRepository.save(patient);
  }
}
