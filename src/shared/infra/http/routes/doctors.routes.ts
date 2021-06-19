import { Router } from 'express';

import { CreateDoctorController } from '../../../../modules/doctors/useCases/createDoctor/CreateDoctorController';
import { ListAllDoctorsController } from '../../../../modules/doctors/useCases/listAllDoctors/ListAllDoctorsController';
import { ShowDoctorController } from '../../../../modules/doctors/useCases/showDoctor/ShowDoctorController';
import { UpdateDoctorController } from '../../../../modules/doctors/useCases/updateDoctor/UpdateDoctorController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createDoctorController = new CreateDoctorController();
const listAllDoctorsController = new ListAllDoctorsController();
const showDoctorController = new ShowDoctorController();
const updateDoctorController = new UpdateDoctorController();

export const doctorRoutes = Router();

doctorRoutes.use(ensureAuthenticated);

doctorRoutes.post('/', createDoctorController.handle);
doctorRoutes.get('/', listAllDoctorsController.handle);
doctorRoutes.get('/:id', showDoctorController.handle);
doctorRoutes.put('/:id', updateDoctorController.handle);
