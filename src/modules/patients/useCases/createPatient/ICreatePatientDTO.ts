export interface ICreatePatientDTO {
  name: string;
  cpf: string;
  birth_date: Date;
  phone?: string;
  address: string;
}
