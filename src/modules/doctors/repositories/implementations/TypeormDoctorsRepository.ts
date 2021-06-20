import { getRepository, Repository } from 'typeorm';

import { Doctor } from '../../entities/Doctor';
import { ICreateDoctorDTO } from '../../useCases/createDoctor/ICreateDoctorDTO';
import { IDoctorsRepository } from '../IDoctorsRepository';

export class TypeormDoctorsRepository implements IDoctorsRepository {
  private repository: Repository<Doctor>;

  constructor() {
    this.repository = getRepository(Doctor);
  }

  public async findAll(): Promise<Doctor[]> {
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
    phone,
    crm,
    user_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const user = this.repository.create({ name, phone, crm, user_id });

    return this.repository.save(user);
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.repository.save(doctor);
  }
}
