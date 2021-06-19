import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DoctorMap } from '../../mapper/DoctorMap';
import { UpdateDoctorUserCase } from './UpdateDoctorUseCase';

export class UpdateDoctorController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, crm } = request.body;

    const updateDoctor = container.resolve(UpdateDoctorUserCase);

    const doctor = await updateDoctor.execute({ id, name, crm });

    return response.status(201).json(DoctorMap.toDTO(doctor));
  }
}
