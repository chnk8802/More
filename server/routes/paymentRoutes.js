import express from 'express';
const router = express.Router();
import { getPayments, createPayment, updatePayment } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getPayments).post(protect, createPayment);
router.route('/:id').put(protect, updatePayment);

export default router;
