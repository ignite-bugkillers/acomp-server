import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePatientUseCase } from './CreatePatientUseCase';
import { ICreatePatientDTO } from './ICreatePatientDTO';

export class CreatePatientController {
  public async handler(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, cpf, address, phone }: ICreatePatientDTO = request.body;

    const createPatientUseCase = container.resolve(CreatePatientUseCase);

    const patient = await createPatientUseCase.execute({
      name,
      cpf,
      address,
      phone,
    });

    return response.status(201).json(patient);
  }
}
