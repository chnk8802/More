import express from 'express';
const router = express.Router();
import { getExpenses, createExpense, updateExpense } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getExpenses).post(protect, createExpense);
router.route('/:id').put(protect, updateExpense);

export default router;
