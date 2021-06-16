import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from './ICreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('TypeormUsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}
