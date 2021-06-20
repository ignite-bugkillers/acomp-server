import { AppError } from '../../../../shared/errors/AppError';

export class ListAllMedicalCareFromPatientError extends AppError {
  constructor() {
    super('Patient does not exists');
  }
}
