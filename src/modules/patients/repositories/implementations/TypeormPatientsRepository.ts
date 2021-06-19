import { getRepository, ILike, Repository } from 'typeorm';

import { Patient } from '../../entities/Patient';
import { ICreatePatientDTO } from '../../useCases/createPatient/ICreatePatientDTO';
import { IPatientsRepository } from '../IPatientsRepository';

export class TypeormPatientsRepository implements IPatientsRepository {
  private repository: Repository<Patient>;

  constructor() {
    this.repository = getRepository(Patient);
  }

  public async findByName(name: string): Promise<Patient[]> {
    return await this.repository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  public async findById(id: string): Promise<Patient | undefined> {
    return this.repository.findOne(id);
  }

  public async save(patient: Patient): Promise<Patient> {
    return this.repository.save(patient);
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
