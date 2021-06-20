import { AppError } from '../../../../shared/errors/AppError';

export namespace CreateMedicalCareError {
  export class DoctorNotExists extends AppError {
    constructor() {
      super('Doctor does not exists');
    }
  }

  export class PatientNotExists extends AppError {
    constructor() {
      super('Patient does not exists');
    }
  }

  export class ProcedureNotExists extends AppError {
    constructor() {
      super('Procedure does not exists');
    }
  }
}
