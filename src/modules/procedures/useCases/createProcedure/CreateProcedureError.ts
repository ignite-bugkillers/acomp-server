import { AppError } from '../../../../shared/errors/AppError';

export class CreateProcedureError extends AppError {
  constructor(message = 'Procedure already exists') {
    super(message);
  }
}
