import { container } from 'tsyringe';

import './providers';

import { TypeormUsersRepository } from '../../modules/accounts/repositories/implementations/TypeormUsersRepositor';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { TypeormDoctorRepository } from '../../modules/doctors/repositories/implementations/TypeormDoctorRepository';
import { IDoctorRepository } from '../../modules/doctors/repositories/interfaces/IDoctorRepository';
import { TypeormPatientsRepository } from '../../modules/patients/repositories/implementations/TypeormPatientsRepository';
import { IPatientsRepository } from '../../modules/patients/repositories/IPatientsRepository';

container.registerSingleton<IUsersRepository>(
  'TypeormUsersRepository',
  TypeormUsersRepository
);

container.registerSingleton<IDoctorRepository>(
  'TypeormDoctorRepository',
  TypeormDoctorRepository
);

container.registerSingleton<IPatientsRepository>(
  'TypeormPatientsRepository',
  TypeormPatientsRepository
);
