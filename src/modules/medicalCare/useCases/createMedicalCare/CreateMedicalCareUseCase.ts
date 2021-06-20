import { inject, injectable } from 'tsyringe';

import { IDoctorsRepository } from '../../../doctors/repositories/IDoctorsRepository';
import { IPatientsRepository } from '../../../patients/repositories/IPatientsRepository';
import { IProcedureRepository } from '../../../procedures/repositories/interfaces/IProcedureRepository';
import { MedicalCare } from '../../entities/MedicalCare';
import { IMedicalCareRepository } from '../../repositories/IMedicalCateRepository';
import { CreateMedicalCareError } from './CreateMedicalCareError';
import { ICreateMedicalCareDTO } from './ICreateMedicalCareDTO';

@injectable()
export class CreateMedicalCareUseCase {
  constructor(
    @inject('TypeormMedicalCareRepository')
    private medicalCareRepository: IMedicalCareRepository,

    @inject('TypeormDoctorsRepository')
    private doctorsRepository: IDoctorsRepository,

    @inject('TypeormPatientsRepository')
    private patientsRepository: IPatientsRepository,

    @inject('TypeormProcedureRepository')
    private proceduresRepository: IProcedureRepository
  ) {}

  public async execute({
    doctor_id,
    patient_id,
    procedure_id,
    date,
    description,
  }: ICreateMedicalCareDTO): Promise<MedicalCare> {
    const doctor = await this.doctorsRepository.findByID(doctor_id);

    if (!doctor) {
      throw new CreateMedicalCareError.DoctorNotExists();
    }

    const patient = await this.patientsRepository.findById(patient_id);

    if (!patient) {
      throw new CreateMedicalCareError.PatientNotExists();
    }

    const procedure = await this.proceduresRepository.findByID(procedure_id);

    if (!procedure) {
      throw new CreateMedicalCareError.ProcedureNotExists();
    }

    const medicalCare = await this.medicalCareRepository.create({
      doctor_id,
      patient_id,
      procedure_id,
      date,
      description,
    });

    return medicalCare;
  }
}
