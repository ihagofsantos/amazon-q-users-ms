import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validateLogin } from '../middlewares/validation.middleware';
const router = Router()

router.post('/login', validateLogin, AuthController.login);

export default router