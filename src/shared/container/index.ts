import { container } from 'tsyringe';

import './providers';

import { TypeormUsersRepository } from '../../modules/accounts/repositories/implementations/TypeormUsersRepositor';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';

import { TypeormDoctorRepository } from '../../modules/doctors/repositories/implementations/TypeormDoctorRepository';
import { IDoctorRepository } from '../../modules/doctors/repositories/interfaces/IDoctorRepository';

container.registerSingleton<IUsersRepository>(
  'TypeormUsersRepository',
  TypeormUsersRepository
);

container.registerSingleton<IDoctorRepository>(
  'TypeormDoctorRepository',
  TypeormDoctorRepository
);
