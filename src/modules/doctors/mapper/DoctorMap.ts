import { Doctor } from '../entities/Doctor';

export class DoctorMap {
  static toDTO({
    id,
    name,
    phone,
    crm,
    user_id,
    created_at,
    updated_at,
  }: Doctor) {
    return { id, name, phone, crm, user_id, created_at, updated_at };
  }
}
