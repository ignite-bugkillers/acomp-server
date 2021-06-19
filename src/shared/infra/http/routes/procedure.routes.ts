import { Router } from 'express';

import { CreateProcedureController } from '../../../../modules/procedures/useCases/createProcedure/CreateProcedureController';
import { ListAllProceduresController } from '../../../../modules/procedures/useCases/listAllProcedures/ListAllProceduresController';
import { ShowProcedureController } from '../../../../modules/procedures/useCases/showProcedure/ShoeProcedureController';
import { UpdateProcedureController } from '../../../../modules/procedures/useCases/updateProcedure/UpdateProcedureController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createProcedureController = new CreateProcedureController();
const listAllProceduresController = new ListAllProceduresController();
const showProcedureController = new ShowProcedureController();
const updateProcedureController = new UpdateProcedureController();

export const procedureRoutes = Router();

procedureRoutes.use(ensureAuthenticated);

procedureRoutes.post('/', createProcedureController.handle);
procedureRoutes.get('/', listAllProceduresController.handle);
procedureRoutes.get('/:id', showProcedureController.handle);
procedureRoutes.put('/:id', updateProcedureController.handle);
