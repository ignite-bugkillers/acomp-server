import { Router } from 'express';

import { CreatePatientController } from '../../../../modules/patients/useCases/createPatient/CreatePatientController';
import { ListPatientsController } from '../../../../modules/patients/useCases/listPatients/ListPatientsController';
import { UpdatePatientController } from '../../../../modules/patients/useCases/updatePatient/UpdatePatientController';

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listPatientsController = new ListPatientsController();
const updatePatientController = new UpdatePatientController();

patientsRoutes.get('/', listPatientsController.handle);
patientsRoutes.post('/', createPatientController.handle);
patientsRoutes.put('/:id', updatePatientController.handle);

export { patientsRoutes };
