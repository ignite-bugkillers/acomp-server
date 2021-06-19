import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserMap } from '../../mapper/UserMap';
import { ShowProfileUseCase } from './ShowProfileUseCase';

export class ShowProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const showProfileUseCase = container.resolve(ShowProfileUseCase);

    const user = await showProfileUseCase.execute({ user_id });

    return response.json(UserMap.toDTO(user));
  }
}
