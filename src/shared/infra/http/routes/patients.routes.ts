import { Router } from 'express';

import { CreatePatientController } from '../../../../modules/patients/useCases/createPatient/CreatePatientController';
import { ListAllPatientsController } from '../../../../modules/patients/useCases/listAllPatients/ListAllPatientsController';

const patientsRoutes = Router();

const createPatientController = new CreatePatientController();
const listAllPatientsController = new ListAllPatientsController();

patientsRoutes.get('/', listAllPatientsController.handler);
patientsRoutes.post('/', createPatientController.handler);

export { patientsRoutes };
