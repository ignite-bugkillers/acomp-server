import { Router } from 'express';

import { CreatePatientController } from '../../../../modules/patients/useCases/createPatient/CreatePatientController';
import { ListPatientsController } from '../../../../modules/patients/useCases/listPatients/ListPatientsController';
import { ShowPatientController } from '../../../../modules/patients/useCases/showPatient/ShowPatientController';
import { UpdatePatientController } from '../../../../modules/patients/useCases/updatePatient/UpdatePatientController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listPatientsController = new ListPatientsController();
const updatePatientController = new UpdatePatientController();
const showPatientController = new ShowPatientController();

patientsRoutes.use(ensureAuthenticated);

patientsRoutes.get('/', listPatientsController.handle);
patientsRoutes.post('/', createPatientController.handle);
patientsRoutes.put('/:id', updatePatientController.handle);
patientsRoutes.get('/:id', showPatientController.handle);

export { patientsRoutes };
