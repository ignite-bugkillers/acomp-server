export interface ICreateMedicalCareDTO {
  patient_id: string;
  doctor_id: string;
  procedure_id: string;
  date: Date;
  description: string;
}
