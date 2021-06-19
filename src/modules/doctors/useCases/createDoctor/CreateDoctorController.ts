import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DoctorMap } from '../../mapper/DoctorMap';
import { CreateDoctorUserCase } from './CreateUserUseCase';
import { ICreateDoctorDTO } from './ICreateDoctorDTO';

export class CreateDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, crm }: ICreateDoctorDTO = request.body;

    const createDoctor = container.resolve(CreateDoctorUserCase);

    const doctor = await createDoctor.execute({
      name,
      crm,
      user_id: request.user.id,
    });

    return response.status(201).json(DoctorMap.toDTO(doctor));
  }
}
