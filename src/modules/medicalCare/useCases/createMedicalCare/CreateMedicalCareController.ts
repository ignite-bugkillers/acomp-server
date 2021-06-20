import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateMedicalCareUseCase } from './CreateMedicalCareUseCase';
import { ICreateMedicalCareDTO } from './ICreateMedicalCareDTO';

export class CreateMedicalCareController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const {
      date,
      description,
      doctor_id,
      patient_id,
      procedure_id,
    }: ICreateMedicalCareDTO = request.body;

    const createMedicalCareUseCase = container.resolve(
      CreateMedicalCareUseCase
    );

    const medicalCare = await createMedicalCareUseCase.execute({
      date,
      description,
      doctor_id,
      patient_id,
      procedure_id,
    });

    return response.status(201).json(medicalCare);
  }
}
