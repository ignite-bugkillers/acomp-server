import { Procedure } from '../../entities/Procedure';
import { ICreateProcedureDTO } from '../../useCases/createProcedure/ICreateProcedureDTO';

export interface IProcedureRepository {
  create(data: ICreateProcedureDTO): Promise<Procedure>;
  save(procedure: Procedure): Promise<Procedure>;
  findByID(id: string): Promise<Procedure | undefined>;
  findByType(type: string): Promise<Procedure | undefined>;
  findAll(): Promise<Procedure[] | undefined>;
}
