import { injectable, inject } from 'tsyringe';

import { IDoctorsRepository } from '../../repositories/IDoctorsRepository';

@injectable()
export class ShowDoctorUseCase {
  constructor(
    @inject('TypeormDoctorsRepository')
    private doctorRepository: IDoctorsRepository
  ) {}

  public async execute(id: string) {
    const doctor = await this.doctorRepository.findByID(id);

    return doctor;
  }
}
