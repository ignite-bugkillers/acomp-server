import { Router } from 'express';

import { ShowProfileController } from '../../../../modules/accounts/useCases/showProfile/ShowProfileController';
import { UpdateProfileController } from '../../../../modules/accounts/useCases/updateProfile/UpdateProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const profileRoutes = Router();

const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

profileRoutes.use(ensureAuthenticated);

profileRoutes.get('/me', showProfileController.handle);
profileRoutes.put('/', updateProfileController.handle);

export { profileRoutes };
