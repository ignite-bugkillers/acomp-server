import { AppError } from '../../../../shared/errors/AppError';

export class UpdateProcedureError extends AppError {
  constructor(message = 'Procedure does not exists') {
    super(message);
  }
}
