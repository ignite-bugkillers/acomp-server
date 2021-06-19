import { Doctor } from '../entities/Doctor';

export class DoctorMap {
  static toDTO({ id, phone, crm, user_id, created_at, updated_at }: Doctor) {
    return { id, phone, crm, user_id, created_at, updated_at };
  }
}
