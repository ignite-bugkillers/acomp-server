import { inject, injectable } from 'tsyringe';

import { Patient } from '../../entities/Patient';
import { IPatientsRepository } from '../../repositories/IPatientsRepository';

@injectable()
export class ListAllPatientsUseCase {
  constructor(
    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository
  ) {}

  public async execute(): Promise<Patient[]> {
    return this.patientsRepository.listAll();
  }
}
