import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { authConfig } from '../../../../config/auth';
import { IHashProvider } from '../../../../shared/container/providers/HashProvider/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { IAuthenticateUserResponseDTO } from './IAuthenticateUserResponseDTO';
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('TypeormUsersRepository')
    private usersRepository: IUsersRepository,

    @inject('BCryptHashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new IncorrectEmailOrPasswordError();
    }

    const passwordMath = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMath) {
      throw new IncorrectEmailOrPasswordError();
    }

    const { expiresIn, secret } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
