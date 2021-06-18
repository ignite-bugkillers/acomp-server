import { getRepository, Repository } from 'typeorm';

import { Doctor } from '../../entities/Doctor';
import { ICreateDoctorDTO } from '../../useCases/createDoctor/ICreateDoctorDTO';
import { IDoctorRepository } from '../interfaces/IDoctorRepository';

export class TypeormDoctorRepository implements IDoctorRepository {
  private repository: Repository<Doctor>;

  constructor() {
    this.repository = getRepository(Doctor);
  }

  public async findAll(): Promise<Doctor[] | undefined> {
    return this.repository.find();
  }

  public async findByID(id: string): Promise<Doctor | undefined> {
    return this.repository.findOne(id);
  }

  public async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.repository.findOne({ where: { crm } });
  }

  public async create({
    name,
    crm,
    user_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const user = this.repository.create({ name, crm, user_id });

    return this.repository.save(user);
  }
}
