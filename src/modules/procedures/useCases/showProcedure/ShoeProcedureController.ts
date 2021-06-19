import { Response, Request } from 'express';
import { container } from 'tsyringe';

import { ShowProcedureUseCase } from './ShowProcedureUserCase';

export class ShowProcedureController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showoProcedure = container.resolve(ShowProcedureUseCase);
    const { id } = request.params;

    const procedure = await showoProcedure.execute(id);

    return response.status(200).json(procedure);
  }
}
