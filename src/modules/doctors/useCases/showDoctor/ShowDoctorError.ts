import { AppError } from '../../../../shared/errors/AppError';

export class ShowDoctorError extends AppError {
  constructor() {
    super('Doctor does not exists');
  }
}
