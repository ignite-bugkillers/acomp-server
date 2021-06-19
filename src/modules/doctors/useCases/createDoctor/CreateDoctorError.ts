import { AppError } from '../../../../shared/errors/AppError';

export namespace CreateDoctorError {
  export class DoctorAlreadyExists extends AppError {
    constructor() {
      super('Doctor already exists');
    }
  }

  export class UserNotExists extends AppError {
    constructor() {
      super('User does not exists');
    }
  }
}
