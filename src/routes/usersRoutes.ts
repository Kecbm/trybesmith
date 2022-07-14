import { Router } from 'express';

import UsersController from '../controllers/usersController';
import { validationUsername, validationClasse, validationLevel,
  validationPassword } from '../middlewares/validateUsers';

const router = Router();

const usersController = new UsersController();

router.post(
  '/',
  validationUsername,
  validationClasse,
  validationLevel,
  validationPassword,
  usersController.create,
);

export default router;