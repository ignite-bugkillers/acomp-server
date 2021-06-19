import { Procedure } from '../entities/Procedure';

export class ProcedureMap {
  static toDTO({ id, type, created_at, updated_at }: Procedure) {
    return { id, type, created_at, updated_at };
  }
}
