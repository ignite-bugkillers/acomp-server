import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { patientsRoutes } from './patients.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/patients', patientsRoutes);
routes.use(authenticateRoutes);

export { routes };
