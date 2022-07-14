import { Router } from 'express';

import LoginController from '../controllers/loginController';
import validationBody from '../middlewares/validateLogin';

const router = Router();

const loginController = new LoginController();

router.post(
  '/',
  validationBody,
  loginController.enter,
);

export default router;