import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { doctorRoutes } from './doctors.routes';
import { patientsRoutes } from './patients.routes';
import { profileRoutes } from './profile.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/doctors', doctorRoutes);
routes.use('/patients', patientsRoutes);
routes.use('/profile', profileRoutes);
routes.use(authenticateRoutes);

export { routes };
