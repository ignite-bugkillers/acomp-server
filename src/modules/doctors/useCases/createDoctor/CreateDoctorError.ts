import { AppError } from '../../../../shared/errors/AppError';

export class CreateDoctorError extends AppError {
  constructor(message = 'Doctor already exists') {
    super(message);
  }
}
