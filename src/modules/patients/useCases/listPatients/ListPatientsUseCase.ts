import { inject, injectable } from 'tsyringe';

import { Patient } from '../../entities/Patient';
import { IPatientsRepository } from '../../repositories/IPatientsRepository';
import { IListPatientsDTO } from './IListPatientsDTO';

@injectable()
export class ListPatientsUseCase {
  constructor(
    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute({ patient_name }: IListPatientsDTO): Promise<Patient[]> {
    if (patient_name) {
      return this.patientsRepository.findByName(patient_name);
    }

    return this.patientsRepository.listAll();
  }
}
