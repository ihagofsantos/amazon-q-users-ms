import { Router } from 'express';
import { UserController } from '../controllers/user.controllers';
const router = Router()

router.get('/', UserController.findAll);
router.post('/create', UserController.create);
router.get('/:id', UserController.find);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router