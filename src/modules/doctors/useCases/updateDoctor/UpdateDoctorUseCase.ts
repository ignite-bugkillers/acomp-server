import { injectable, inject } from 'tsyringe';

import { Doctor } from '../../entities/Doctor';
import { IDoctorRepository } from '../../repositories/interfaces/IDoctorRepository';
import { UpdateDoctorError } from './UpdateDoctorError';

interface IRequest {
  id: string;
  name: string;
  crm: string;
}

@injectable()
export class UpdateDoctorUserCase {
  constructor(
    @inject('TypeormDoctorRepository')
    private doctorRepository: IDoctorRepository
  ) {}

  public async execute({ id, name, crm }: IRequest): Promise<Doctor> {
    const doctorExists = await this.doctorRepository.findByID(id);

    if (!doctorExists) {
      throw new UpdateDoctorError('Doctor does not exists');
    }

    doctorExists.name = name;
    doctorExists.crm = crm;

    const doctor = await this.doctorRepository.save(doctorExists);

    return doctor;
  }
}
