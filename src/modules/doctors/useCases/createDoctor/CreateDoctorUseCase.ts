import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository';
import { Doctor } from '../../entities/Doctor';
import { IDoctorsRepository } from '../../repositories/IDoctorsRepository';
import { CreateDoctorError } from './CreateDoctorError';
import { ICreateDoctorDTO } from './ICreateDoctorDTO';

@injectable()
export class CreateDoctorUserCase {
  constructor(
    @inject('TypeormDoctorsRepository')
    private doctorRepository: IDoctorsRepository,

    @inject('TypeormUsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    phone,
    crm,
    user_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctorAlreadyExists = await this.doctorRepository.findByCRM(crm);

    if (doctorAlreadyExists) {
      throw new CreateDoctorError.DoctorAlreadyExists();
    }

    const userExists = await this.userRepository.findByID(user_id);

    if (!userExists) {
      throw new CreateDoctorError.UserNotExists();
    }

    const doctor = await this.doctorRepository.create({
      name,
      phone,
      crm,
      user_id,
    });

    return doctor;
  }
}
