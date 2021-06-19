import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllDoctorsUserCase } from './ListAllDoctorsUserCase';

export class ListAllDoctorsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllDoctors = container.resolve(ListAllDoctorsUserCase);

    const doctors = await listAllDoctors.execute();

    return response.status(201).json(doctors);
  }
}
