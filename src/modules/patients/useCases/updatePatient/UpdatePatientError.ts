import { AppError } from '../../../../shared/errors/AppError';

export namespace UpdatePatientError {
  export class PatientNotFound extends AppError {
    constructor() {
      super('Patient not found', 404);
    }
  }
}
