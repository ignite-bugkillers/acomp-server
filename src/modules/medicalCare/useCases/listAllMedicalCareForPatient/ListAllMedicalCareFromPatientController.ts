import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllMedicalCareFromPatientUseCase } from './ListAllMedicalCareFromPatientUseCase';

export class ListAllMedicalCareFromPatientController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const patient_id = request.query.patient_id as string;

    const listAllMedicalCareFromPatientUseCase = container.resolve(
      ListAllMedicalCareFromPatientUseCase
    );

    const medicalCare = await listAllMedicalCareFromPatientUseCase.execute({
      patient_id,
    });

    return response.json(medicalCare);
  }
}
