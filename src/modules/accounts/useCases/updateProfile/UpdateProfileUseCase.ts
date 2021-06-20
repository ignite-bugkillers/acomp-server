import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IUpdateProfileDTO } from './IUpdateProfileDTO';
import { UpdateProfileError } from './UpdateProfileError';

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject('TypeormUsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    name,
    email,
  }: IUpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new UpdateProfileError.UserNotExists();
    }

    const findUserByEmail = await this.usersRepository.findByEmail(email);

    if (findUserByEmail && findUserByEmail.id !== user_id) {
      throw new UpdateProfileError.EmailInUse();
    }

    Object.assign(user, {
      name,
      email,
    });

    return this.usersRepository.save(user);
  }
}
