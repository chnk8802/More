import express from 'express';
const router = express.Router();
import { getShops, createShop, updateShop } from '../controllers/shopController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getShops).post(protect, createShop);
router.route('/:id').put(protect, updateShop);

export default router;
