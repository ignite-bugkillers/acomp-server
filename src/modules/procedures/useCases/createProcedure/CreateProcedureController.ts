import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ProcedureMap } from '../../mapper/ProcedureMap';
import { CreateProcedureUseCase } from './CreateProcedureUseCase';
import { ICreateProcedureDTO } from './ICreateProcedureDTO';

export class CreateProcedureController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type }: ICreateProcedureDTO = request.body;

    const createProcedure = container.resolve(CreateProcedureUseCase);

    const procedure = await createProcedure.execute({ type });

    return response.status(201).json(ProcedureMap.toDTO(procedure));
  }
}
