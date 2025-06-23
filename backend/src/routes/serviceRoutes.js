import { Router } from 'express';
import { getAllServices, addService, deleteService } from '../controllers/serviceController.js';

const router = Router();

router.get('/', getAllServices);
router.post('/', addService);
router.delete('/:id', deleteService);

export default router;
