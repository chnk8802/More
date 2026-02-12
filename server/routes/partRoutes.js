import express from 'express';
const router = express.Router();
import { getParts, createPart, updatePart } from '../controllers/partController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getParts).post(protect, createPart);
router.route('/:id').put(protect, updatePart);

export default router;
