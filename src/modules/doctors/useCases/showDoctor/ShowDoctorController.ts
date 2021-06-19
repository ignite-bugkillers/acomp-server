import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ShowDoctorUseCase } from './ShowDoctorUserCase';

export class ShowDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showoDoctor = container.resolve(ShowDoctorUseCase);
    const { id } = request.params;

    const doctor = await showoDoctor.execute(id);

    return response.status(200).json(doctor);
  }
}
