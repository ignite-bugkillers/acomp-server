import { AppError } from '../../../../shared/errors/AppError';

export namespace UpdateDoctorError {
  export class DoctorNotExists extends AppError {
    constructor() {
      super('Doctor already exists');
    }
  }

  export class CrmInUse extends AppError {
    constructor() {
      super('CRM in use from another');
    }
  }
}
