import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { doctorRoutes } from './doctors.routes';
import { patientsRoutes } from './patients.routes';
import { procedureRoutes } from './procedure.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);
routes.use(ensureAuthenticated);

routes.use('/doctors', doctorRoutes);
routes.use('/patients', patientsRoutes);
routes.use('/procedures', procedureRoutes);

export { routes };
