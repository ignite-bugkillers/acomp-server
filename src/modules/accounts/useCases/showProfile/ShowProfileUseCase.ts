import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IShowProfileDTO } from './IShowProfileDTO';
import { ShowProfileError } from './ShowProfileError';

@injectable()
export class ShowProfileUseCase {
  constructor(
    @inject('TypeormUsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IShowProfileDTO): Promise<User> {
    const user = await this.usersRepository.findByID(user_id);

    if (!user) {
      throw new ShowProfileError();
    }

    return user;
  }
}
