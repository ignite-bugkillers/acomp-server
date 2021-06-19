import { injectable, inject } from 'tsyringe';

import { IProcedureRepository } from '../../repositories/interfaces/IProcedureRepository';

@injectable()
export class ShowProcedureUseCase {
  constructor(
    @inject('TypeormProcedureRepository')
    private procedureRepository: IProcedureRepository
  ) {}

  public async execute(id: string) {
    return this.procedureRepository.findByID(id);
  }
}
