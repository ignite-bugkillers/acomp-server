import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DoctorMap } from '../../mapper/DoctorMap';
import { CreateDoctorUserCase } from './CreateUserUseCase';
import { ICreateDoctorDTO } from './ICreateDoctorDTO';

export class CreateDoctorController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { phone, crm, user_id, name }: ICreateDoctorDTO = request.body;

    const createDoctor = container.resolve(CreateDoctorUserCase);

    const doctor = await createDoctor.execute({
      name,
      phone,
      crm,
      user_id,
    });

    return response.status(201).json(DoctorMap.toDTO(doctor));
  }
}
