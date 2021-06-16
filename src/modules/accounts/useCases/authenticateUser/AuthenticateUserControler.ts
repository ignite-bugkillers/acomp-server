import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

interface IRequest {
  email: string;
  password: string;
}

export class AuthenticateUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body as IRequest;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const { user, token } = await authenticateUserUseCase.execute({
      email: email.toLowerCase(),
      password,
    });

    return response.json({ user, token });
  }
}
