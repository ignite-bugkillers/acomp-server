import { Doctor } from '../../entities/Doctor';
import { ICreateDoctorDTO } from '../../useCases/createDoctor/ICreateDoctorDTO';

export interface IDoctorRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
  findByID(id: string): Promise<Doctor | undefined>;
  findByCRM(id: string): Promise<Doctor | undefined>;
  findAll(): Promise<Doctor[] | undefined>;
}
