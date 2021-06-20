import { injectable, inject } from 'tsyringe';

import { Doctor } from '../../entities/Doctor';
import { IDoctorsRepository } from '../../repositories/IDoctorsRepository';
import { IShowDoctorDTO } from './IShowDoctorDTO';
import { ShowDoctorError } from './ShowDoctorError';

@injectable()
export class ShowDoctorUseCase {
  constructor(
    @inject('TypeormDoctorsRepository')
    private doctorRepository: IDoctorsRepository
  ) {}

  public async execute({ doctor_id }: IShowDoctorDTO): Promise<Doctor> {
    const doctor = await this.doctorRepository.findByID(doctor_id);

    if (!doctor) {
      throw new ShowDoctorError();
    }

    return doctor;
  }
}
