import { Router } from 'express';

import { ShowProfileController } from '../../../../modules/accounts/useCases/showProfile/ShowProfileController';

const profileRoutes = Router();

const showProfileController = new ShowProfileController();

profileRoutes.get('/me', showProfileController.handle);

export { profileRoutes };
