import { Router } from 'express';

import { CreateMedicalCareController } from '../../../../modules/medicalCare/useCases/createMedicalCare/CreateMedicalCareController';
import { ListAllMedicalCareFromPatientController } from '../../../../modules/medicalCare/useCases/listAllMedicalCareForPatient/ListAllMedicalCareFromPatientController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const medicalCareRoutes = Router();

const createMedicalCareController = new CreateMedicalCareController();
const listAllMedicalCareFromPatientController =
  new ListAllMedicalCareFromPatientController();

medicalCareRoutes.use(ensureAuthenticated);

medicalCareRoutes.get('/', listAllMedicalCareFromPatientController.handle);
medicalCareRoutes.post('/', createMedicalCareController.handle);

export { medicalCareRoutes };
