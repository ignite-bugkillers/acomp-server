import { injectable, inject } from 'tsyringe';

import { Doctor } from '../../entities/Doctor';
import { IDoctorsRepository } from '../../repositories/IDoctorsRepository';
import { UpdateDoctorError } from './UpdateDoctorError';

interface IRequest {
  id: string;
  name: string;
  phone: string;
  crm: string;
}

@injectable()
export class UpdateDoctorUserCase {
  constructor(
    @inject('TypeormDoctorsRepository')
    private doctorsRepository: IDoctorsRepository
  ) {}

  public async execute({ id, name, phone, crm }: IRequest): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findByID(id);

    if (!doctor) {
      throw new UpdateDoctorError.DoctorNotExists();
    }

    const findDoctorByCrm = await this.doctorsRepository.findByCRM(crm);

    if (findDoctorByCrm && findDoctorByCrm.id !== id) {
      throw new UpdateDoctorError.CrmInUse();
    }

    Object.assign(doctor, {
      name,
      phone,
      crm,
    });

    return this.doctorsRepository.save(doctor);
  }
}
