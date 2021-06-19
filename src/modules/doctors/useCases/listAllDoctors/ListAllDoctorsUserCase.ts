import { injectable, inject } from 'tsyringe';

import { Doctor } from '../../entities/Doctor';
import { IDoctorRepository } from '../../repositories/interfaces/IDoctorRepository';

@injectable()
export class ListAllDoctorsUserCase {
  constructor(
    @inject('TypeormDoctorRepository')
    private doctorRepository: IDoctorRepository
  ) {}

  public async execute(): Promise<Doctor[] | undefined> {
    const doctors = await this.doctorRepository.findAll();
    return doctors;
  }
}
