import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IUpdatedPatientDTO } from './IUpdatePatientDTO';
import { UpdatePatientUseCase } from './UpdatePatientUseCase';

export class UpdatePatientController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      cpf,
      birth_date,
      address,
      phone,
    }: Omit<IUpdatedPatientDTO, 'id'> = request.body;

    const updatePatientUseCase = container.resolve(UpdatePatientUseCase);

    const patient = await updatePatientUseCase.execute({
      id,
      name,
      cpf,
      birth_date,
      address,
      phone,
    });

    return response.json(patient);
  }
}
