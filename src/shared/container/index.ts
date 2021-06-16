import { container } from 'tsyringe';

import { TypeormUsersRepository } from '../../modules/accounts/repositories/implementations/TypeormUsersRepositor';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'TypeormUsersRepository',
  TypeormUsersRepository
);
