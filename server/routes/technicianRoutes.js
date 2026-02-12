import express from 'express';
const router = express.Router();
import { getTechnicians, createTechnician, updateTechnician } from '../controllers/technicianController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getTechnicians).post(protect, createTechnician);
router.route('/:id').put(protect, updateTechnician);

export default router;
