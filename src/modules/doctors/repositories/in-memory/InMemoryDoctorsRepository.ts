import { Doctor } from '../../entities/Doctor';
import { ICreateDoctorDTO } from '../../useCases/createDoctor/ICreateDoctorDTO';
import { IDoctorsRepository } from '../IDoctorsRepository';

export class InMemoryDoctorsRepository implements IDoctorsRepository {
  private doctors: Doctor[];

  constructor() {
    this.doctors = [];
  }

  public async create({
    crm,
    name,
    phone,
    user_id,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();

    Object.assign(doctor, {
      crm,
      name,
      phone,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.doctors.push(doctor);

    return doctor;
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    const doctorIndex = this.doctors.findIndex(
      (findDoctor) => findDoctor.id === doctor.id
    );

    this.doctors[doctorIndex] = doctor;

    return doctor;
  }

  public async findByID(id: string): Promise<Doctor | undefined> {
    return this.doctors.find((findDoctor) => findDoctor.id === id);
  }

  public async findByCRM(crm: string): Promise<Doctor | undefined> {
    return this.doctors.find((findDoctor) => findDoctor.crm === crm);
  }

  public async findAll(): Promise<Doctor[]> {
    return this.doctors;
  }
}
