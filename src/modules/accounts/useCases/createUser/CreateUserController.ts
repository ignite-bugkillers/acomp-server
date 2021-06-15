import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserMap } from '../../mapper/UserMap';
import { CreateUserUseCase } from './CreateUserUseCase';
import { ICreateUserDTO } from './ICreateUserDTO';

export class CreateUserController {
  public async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, password }: ICreateUserDTO = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({ name, email, password });

    return response.status(201).json(UserMap.toDTO(user));
  }
}
