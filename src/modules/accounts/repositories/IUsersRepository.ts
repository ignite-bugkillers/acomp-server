import { User } from '../entities/User';
import { ICreateUserDTO } from '../useCases/createUser/ICreateUserDTO';

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<undefined | User>;
  findByID(id: string): Promise<undefined | User>;
  save(user: User): Promise<User>;
}
