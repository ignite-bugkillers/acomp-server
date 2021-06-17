import { Router } from 'express';

import { CreatePatientController } from '../../../../modules/patients/useCases/createPatient/CreatePatientController';

const patientsRoutes = Router();

const createPatientsController = new CreatePatientController();

patientsRoutes.post('/', createPatientsController.handler);

export { patientsRoutes };
