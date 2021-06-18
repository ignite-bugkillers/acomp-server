import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { doctorRoutes } from './doctors.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);
routes.use(ensureAuthenticated);

routes.use('/doctors', doctorRoutes);

export { routes };
