import { AppError } from '../../../../shared/errors/AppError';

export namespace UpdateProfileError {
  export class UserNotExists extends AppError {
    constructor() {
      super('User does not exists');
    }
  }

  export class EmailInUse extends AppError {
    constructor() {
      super('Email already in user');
    }
  }
}
