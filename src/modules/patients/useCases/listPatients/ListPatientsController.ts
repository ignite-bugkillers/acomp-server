import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPatientsUseCase } from './ListPatientsUseCase';

export class ListPatientsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const patient_name = request.query.name as string;
    const listPatientsUseCase = container.resolve(ListPatientsUseCase);

    const patients = await listPatientsUseCase.execute({ patient_name });

    return response.json(patients);
  }
}
