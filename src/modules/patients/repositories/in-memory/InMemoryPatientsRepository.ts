import { Patient } from '../../entities/Patient';
import { ICreatePatientDTO } from '../../useCases/createPatient/ICreatePatientDTO';
import { IPatientsRepository } from '../IPatientsRepository';

export class InMemoryPatientsRepository implements IPatientsRepository {
  private patients: Patient[];

  constructor() {
    this.patients = [];
  }

  public async findByCpf(cpf: string): Promise<Patient | undefined> {
    return this.patients.find((findPatient) => findPatient.cpf === cpf);
  }

  public async create({
    name,
    cpf,
    phone,
    address,
  }: ICreatePatientDTO): Promise<Patient> {
    const patient = new Patient();
    Object.assign(patient, {
      name,
      cpf,
      phone,
      address,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.patients.push(patient);

    return patient;
  }
}