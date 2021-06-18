import { getRepository, Repository } from 'typeorm';

import { Patient } from '../../entities/Patient';
import { ICreatePatientDTO } from '../../useCases/createPatient/ICreatePatientDTO';
import { IPatientsRepository } from '../IPatientsRepository';

export class TypeormPatientsRepository implements IPatientsRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  public async listAll(): Promise<Patient[]> {
    return this.repository.find();
  }

  public async create({
    name,
    cpf,
    address,
    phone,
    birth_date,
  }: ICreatePatientDTO): Promise<Patient> {
    const patient = this.repository.create({
      name,
      cpf,
      address,
      phone,
      birth_date,
    });

    return this.repository.save(patient);
  }

  public async findByCpf(cpf: string): Promise<Patient | undefined> {
    return this.repository.findOne({ where: { cpf } });
  }
}
