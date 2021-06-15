import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<undefined | User>;
}
