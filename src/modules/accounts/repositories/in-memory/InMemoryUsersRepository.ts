import { User } from '../../entities/User';
import { ICreateUserDTO } from '../../useCases/createUser/ICreateUserDTO';
import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUsersRepository implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async findByID(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((findUser) => findUser.email === email);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }
}
