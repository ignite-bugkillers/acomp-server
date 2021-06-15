import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../useCases/createUser/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class TypeormUsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });

    return this.repository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { email } });
  }
}
