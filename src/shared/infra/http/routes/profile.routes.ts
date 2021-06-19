import { Router } from 'express';

import { ShowProfileController } from '../../../../modules/accounts/useCases/showProfile/ShowProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();

const showProfileController = new ShowProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/me', showProfileController.handle);

export { profileRoutes };
