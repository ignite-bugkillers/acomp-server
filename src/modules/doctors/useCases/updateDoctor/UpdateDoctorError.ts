import { AppError } from '../../../../shared/errors/AppError';

export class UpdateDoctorError extends AppError {
  constructor(message = 'Doctor already exists') {
    super(message);
  }
}
