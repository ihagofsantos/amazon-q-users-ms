import { Router } from 'express';
import { UserController } from '../controllers/user.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateCreateUser, validateUpdateUser } from '../middlewares/validation.middleware';
const router = Router()

router.get('/', authMiddleware, UserController.findAll);
router.post('/create', validateCreateUser, UserController.create);
router.get('/:id', authMiddleware, UserController.find);
router.put('/:id', authMiddleware, validateUpdateUser, UserController.update);
router.delete('/:id', authMiddleware, UserController.delete);

export default router