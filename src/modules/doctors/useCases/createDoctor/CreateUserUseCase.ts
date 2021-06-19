import { injectable, inject } from 'tsyringe';

import { IUsersRepository } from '../../../accounts/repositories/IUsersRepository';
import { CreateUserError } from '../../../accounts/useCases/createUser/CreateUserError';
import { Doctor } from '../../entities/Doctor';
import { IDoctorRepository } from '../../repositories/interfaces/IDoctorRepository';
import { CreateDoctorError } from './CreateDoctorError';
import { ICreateDoctorDTO } from './ICreateDoctorDTO';

@injectable()
export class CreateDoctorUserCase {
  constructor(
    @inject('TypeormDoctorRepository')
    private doctorRepository: IDoctorRepository,

    @inject('TypeormUsersRepository')
    private userRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    crm,
    user_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctorAlreadyExists = await this.doctorRepository.findByCRM(crm);

    if (doctorAlreadyExists) {
      throw new CreateDoctorError();
    }

    const userExists = await this.userRepository.findByID(user_id);

    if (!userExists) {
      throw new CreateUserError('User does not exists');
    }

    const doctor = await this.doctorRepository.create({
      name,
      crm,
      user_id,
    });

    return doctor;
  }
}