import { injectable, inject } from 'tsyringe';

import { Doctor } from '../../entities/Doctor';
import { IDoctorsRepository } from '../../repositories/IDoctorsRepository';

@injectable()
export class ListAllDoctorsUserCase {
  constructor(
    @inject('TypeormDoctorsRepository')
    private doctorRepository: IDoctorsRepository
  ) {}

  public async execute(): Promise<Doctor[] | undefined> {
    const doctors = await this.doctorRepository.findAll();
    return doctors;
  }
}
