import { Patient } from '../entities/Patient';
import { ICreatePatientDTO } from '../useCases/createPatient/ICreatePatientDTO';

export interface IPatientsRepository {
  create(data: ICreatePatientDTO): Promise<Patient>;
  save(patient: Patient): Promise<Patient>;
  findByCpf(cpf: string): Promise<undefined | Patient>;
  findById(id: string): Promise<undefined | Patient>;
  listAll(): Promise<Patient[]>;
  findByName(name: string): Promise<Patient[]>;
}
