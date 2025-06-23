import { Router } from 'express';
import { getBalance, getTransactions, addTransaction } from '../controllers/transactionController.js';

const router = Router();

router.get('/balance/:userId', getBalance);
router.get('/history/:userId', getTransactions);
router.post('/', addTransaction);

export default router;
