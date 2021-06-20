import { Router } from 'express';

import { CreateMedicalCareController } from '../../../../modules/medicalCare/useCases/createMedicalCare/CreateMedicalCareController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const medicalCareRoutes = Router();

const createMedicalCareController = new CreateMedicalCareController();

medicalCareRoutes.use(ensureAuthenticated);

medicalCareRoutes.post('/', createMedicalCareController.handle);

export { medicalCareRoutes };
