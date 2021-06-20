import { Doctor } from '../../entities/Doctor';
import { ICreateDoctorDTO } from '../../useCases/createDoctor/ICreateDoctorDTO';

export interface IDoctorRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  save(doctor: Doctor): Promise<Doctor>;
  findByID(id: string): Promise<Doctor | undefined>;
  findByCRM(crm: string): Promise<Doctor | undefined>;
  findAll(): Promise<Doctor[] | undefined>;
}
