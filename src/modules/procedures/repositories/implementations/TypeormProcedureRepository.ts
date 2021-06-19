import { getRepository, Repository } from 'typeorm';

import { Procedure } from '../../entities/Procedure';
import { ICreateProcedureDTO } from '../../useCases/createProcedure/ICreateProcedureDTO';
import { IProcedureRepository } from '../interfaces/IProcedureRepository';

export class TypeormProcedureRepository implements IProcedureRepository {
  private repository: Repository<Procedure>;

  constructor() {
    this.repository = getRepository(Procedure);
  }

  public async findAll(): Promise<Procedure[] | undefined> {
    return this.repository.find();
  }

  public async findByID(id: string): Promise<Procedure | undefined> {
    return this.repository.findOne(id);
  }

  public async findByType(type: string): Promise<Procedure | undefined> {
    return this.repository.findOne({ type });
  }

  public async create({ type }: ICreateProcedureDTO): Promise<Procedure> {
    const procedure = this.repository.create({ type });

    return this.repository.save(procedure);
  }

  public async save(procedure: Procedure): Promise<Procedure> {
    return this.repository.save(procedure);
  }
}
