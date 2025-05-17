import { Router } from 'express';
import { UserController } from '../controllers/user.controllers';
import { validateCreateUser, validateUpdateUser } from '../middlewares/validation.middleware';
const router = Router()

router.get('/', UserController.findAll);
router.post('/create', validateCreateUser, UserController.create);
router.get('/:id', UserController.find);
router.put('/:id', validateUpdateUser, UserController.update);
router.delete('/:id', UserController.delete);

export default router