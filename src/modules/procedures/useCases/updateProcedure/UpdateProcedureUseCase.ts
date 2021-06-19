import { injectable, inject } from 'tsyringe';

import { Procedure } from '../../entities/Procedure';
import { IProcedureRepository } from '../../repositories/interfaces/IProcedureRepository';
import { UpdateProcedureError } from './UpdateProcedureError';

interface IRequest {
  id: string;
  type: string;
}

@injectable()
export class UpdateProcedureUserCase {
  constructor(
    @inject('TypeormProcedureRepository')
    private produceRepository: IProcedureRepository
  ) {}

  public async execute({ id, type }: IRequest): Promise<Procedure> {
    const pocedureExists = await this.produceRepository.findByID(id);

    if (!pocedureExists) {
      throw new UpdateProcedureError();
    }

    pocedureExists.type = type;

    return this.produceRepository.save(pocedureExists);
  }
}
