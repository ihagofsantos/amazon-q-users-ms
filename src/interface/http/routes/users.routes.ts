import { Router } from 'express';
import { UserController } from '../controllers/user.controllers';
import { authMiddleware } from '../middlewares/auth.middleware';
const router = Router()

router.get('/', authMiddleware, UserController.findAll);
router.post('/create', UserController.create);
router.get('/:id', authMiddleware, UserController.find);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.delete);

export default router