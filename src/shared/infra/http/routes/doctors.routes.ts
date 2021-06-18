import { Router } from 'express';

import { CreateDoctorController } from '../../../../modules/doctors/useCases/createDoctor/CreateDoctorController';

const createDoctorController = new CreateDoctorController();

export const doctorRoutes = Router();

doctorRoutes.post('/', createDoctorController.handle);
