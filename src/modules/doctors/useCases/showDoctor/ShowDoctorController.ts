import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ShowDoctorUseCase } from './ShowDoctorUserCase';

export class ShowDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: doctor_id } = request.params;

    const showDoCtorUseCase = container.resolve(ShowDoctorUseCase);

    const doctor = await showDoCtorUseCase.execute({ doctor_id });

    return response.json(doctor);
  }
}
