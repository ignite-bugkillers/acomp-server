import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllPatientsUseCase } from './ListAllPatientsUseCase';

export class ListAllPatientsController {
  public async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const listAllPatientsUseCase = container.resolve(ListAllPatientsUseCase);

    const patients = await listAllPatientsUseCase.execute();

    return response.json(patients);
  }
}
