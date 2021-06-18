import { AppError } from '../../../../shared/errors/AppError';

export class CreateUserError extends AppError {
  constructor(message = 'User already exists') {
    super(message);
  }
}
