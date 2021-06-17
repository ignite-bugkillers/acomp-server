import { container } from 'tsyringe';

import './providers';

import { TypeormUsersRepository } from '../../modules/accounts/repositories/implementations/TypeormUsersRepositor';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';
import { TypeormPatientsRepository } from '../../modules/patients/repositories/implementations/TypeormPatientsRepository';
import { IPatientsRepository } from '../../modules/patients/repositories/IPatientsRepository';

container.registerSingleton<IUsersRepository>(
  'TypeormUsersRepository',
  TypeormUsersRepository
);

container.registerSingleton<IPatientsRepository>(
  'TypeormPatientsRepository',
  TypeormPatientsRepository
);
