import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ShowPatientUseCase } from './ShowPatientUseCase';

export class ShowPatientController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: patient_id } = request.params;

    const showPatientUseCase = container.resolve(ShowPatientUseCase);

    const patient = await showPatientUseCase.execute({
      patient_id,
    });

    return response.json(patient);
  }
}
