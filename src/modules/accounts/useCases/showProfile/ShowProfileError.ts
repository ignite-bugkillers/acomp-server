import { AppError } from '../../../../shared/errors/AppError';

export class ShowProfileError extends AppError {
  constructor() {
    super('User not found', 404);
  }
}
