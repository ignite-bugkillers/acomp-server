import { injectable, inject } from 'tsyringe';

import { Procedure } from '../../entities/Procedure';
import { IProcedureRepository } from '../../repositories/interfaces/IProcedureRepository';

@injectable()
export class ListAllProceduresUserCase {
  constructor(
    @inject('TypeormProcedureRepository')
    private doctorRepository: IProcedureRepository
  ) {}

  public async execute(): Promise<Procedure[] | undefined> {
    return this.doctorRepository.findAll();
  }
}
