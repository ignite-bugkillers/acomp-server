import { inject, injectable } from 'tsyringe';

import { Patient } from '../../entities/Patient';
import { IPatientsRepository } from '../../repositories/IPatientsRepository';
import { CreatePatientError } from './CreatePatientError';
import { ICreatePatientDTO } from './ICreatePatientDTO';

@injectable()
export class CreatePatientUseCase {
  constructor(
    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute({
    name,
    cpf,
    phone,
    address,
    birth_date,
  }: ICreatePatientDTO): Promise<Patient> {
    const patientAlreadyExists = await this.patientsRepository.findByCpf(cpf);

    if (patientAlreadyExists) {
      throw new CreatePatientError();
    }

    const patient = await this.patientsRepository.create({
      name,
      cpf,
      phone,
      address,
      birth_date,
    });

    return patient;
  }
}
