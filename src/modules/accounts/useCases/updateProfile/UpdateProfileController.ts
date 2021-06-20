import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserMap } from '../../mapper/UserMap';
import { IUpdateProfileDTO } from './IUpdateProfileDTO';
import { UpdateProfileUseCase } from './UpdateProfileUseCase';

export class UpdateProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { name, email }: Pick<IUpdateProfileDTO, 'email' | 'name'> =
      request.body;

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

    const userProfile = await updateProfileUseCase.execute({
      user_id,
      email,
      name,
    });

    return response.json(UserMap.toDTO(userProfile));
  }
}
