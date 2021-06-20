import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProcedureMap } from '../../mapper/ProcedureMap';
import { UpdateProcedureUserCase } from './UpdateProcedureUseCase';

export class UpdateProcedureController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { type, description } = request.body;

    const updateProcedure = container.resolve(UpdateProcedureUserCase);

    const procedure = await updateProcedure.execute({ id, type, description });

    return response.status(201).json(ProcedureMap.toDTO(procedure));
  }
}
