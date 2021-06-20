import { Procedure } from '../../entities/Procedure';
import { ICreateProcedureDTO } from '../../useCases/createProcedure/ICreateProcedureDTO';
import { IProcedureRepository } from '../interfaces/IProcedureRepository';

export class InMemoryProceduresRepository implements IProcedureRepository {
  public procedures: Procedure[];

  constructor() {
    this.procedures = [];
  }

  public async create({
    type,
    description,
  }: ICreateProcedureDTO): Promise<Procedure> {
    const procedure = new Procedure();

    Object.assign(procedure, {
      type,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.procedures.push(procedure);

    return procedure;
  }

  public async save(procedure: Procedure): Promise<Procedure> {
    const procedureIndex = this.procedures.findIndex(
      (findProcedure) => findProcedure.id === procedure.id
    );

    this.procedures[procedureIndex] = procedure;

    return procedure;
  }

  public async findByID(id: string): Promise<Procedure | undefined> {
    return this.procedures.find((findProcedure) => findProcedure.id === id);
  }

  public async findByType(type: string): Promise<Procedure | undefined> {
    return this.procedures.find((findProcedure) => findProcedure.type === type);
  }

  public async findAll(): Promise<Procedure[]> {
    return this.procedures;
  }
}
