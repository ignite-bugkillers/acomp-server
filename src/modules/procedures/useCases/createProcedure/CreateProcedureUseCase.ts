import { injectable, inject } from 'tsyringe';

import { Procedure } from '../../entities/Procedure';
import { IProcedureRepository } from '../../repositories/interfaces/IProcedureRepository';
import { CreateProcedureError } from './CreateProcedureError';
import { ICreateProcedureDTO } from './ICreateProcedureDTO';

@injectable()
export class CreateProcedureUseCase {
  constructor(
    @inject('TypeormProcedureRepository')
    private procedureRepository: IProcedureRepository
  ) {}

  public async execute({
    type,
    description,
  }: ICreateProcedureDTO): Promise<Procedure> {
    const procedureAlreadyExists = await this.procedureRepository.findByType(
      type
    );

    if (procedureAlreadyExists) {
      throw new CreateProcedureError();
    }

    return this.procedureRepository.create({ type, description });
  }
}
