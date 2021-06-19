import { AppError } from '../../../../shared/errors/AppError';

export class ShowPatientError extends AppError {
  constructor() {
    super('Patient does not exists');
  }
}
