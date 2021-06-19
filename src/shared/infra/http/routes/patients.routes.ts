import { Router } from 'express';

import { CreatePatientController } from '../../../../modules/patients/useCases/createPatient/CreatePatientController';
import { ListAllPatientsController } from '../../../../modules/patients/useCases/listAllPatients/ListAllPatientsController';
import { UpdatePatientController } from '../../../../modules/patients/useCases/updatePatient/UpdatePatientController';

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listAllPatientsController = new ListAllPatientsController();
const updatePatientController = new UpdatePatientController();

patientsRoutes.get('/', listAllPatientsController.handle);
patientsRoutes.post('/', createPatientController.handle);
patientsRoutes.put('/:id', updatePatientController.handle);

export { patientsRoutes };
