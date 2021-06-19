import { injectable, inject } from 'tsyringe';

import { IDoctorRepository } from '../../repositories/interfaces/IDoctorRepository';

@injectable()
export class ShowDoctorUseCase {
  constructor(
    @inject('TypeormDoctorRepository')
    private doctorRepository: IDoctorRepository
  ) {}

  public async execute(id: string) {
    const doctor = await this.doctorRepository.findByID(id);

    return doctor;
  }
}
