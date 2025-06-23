import { Router } from 'express';
import { getAllOrders, addOrder, updateOrderStatus, getOrderById } from '../controllers/orderController.js';

const router = Router();

router.get('/', getAllOrders);
router.post('/', addOrder);
router.put('/:id', updateOrderStatus);
router.get('/:id', getOrderById);

export default router;
