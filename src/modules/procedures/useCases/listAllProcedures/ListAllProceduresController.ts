import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllProceduresUserCase } from './ListAllProceduresUseCase';

export class ListAllProceduresController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllProcedures = container.resolve(ListAllProceduresUserCase);

    const doctors = await listAllProcedures.execute();

    return response.status(201).json(doctors);
  }
}
