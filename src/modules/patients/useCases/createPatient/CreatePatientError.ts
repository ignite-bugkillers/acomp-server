import { AppError } from '../../../../shared/errors/AppError';

export class CreatePatientError extends AppError {
  constructor() {
    super('Patient already exists');
  }
}
