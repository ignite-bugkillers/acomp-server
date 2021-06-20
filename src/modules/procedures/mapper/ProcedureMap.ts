import { Procedure } from '../entities/Procedure';

export class ProcedureMap {
  static toDTO({ id, type, description, created_at, updated_at }: Procedure) {
    return { id, type, description, created_at, updated_at };
  }
}
