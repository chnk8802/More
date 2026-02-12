import express from 'express';
const router = express.Router();
import { getJobs, createJob, updateJob, updateJobStatus } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getJobs).post(protect, createJob);
router.route('/:id').put(protect, updateJob);
router.route('/:id/status').patch(protect, updateJobStatus);

export default router;
