import express from 'express';
const router = express.Router();
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

router.route('/')
    .get(protect, authorize('Superadmin', 'Admin'), getUsers)
    .post(protect, authorize('Superadmin', 'Admin'), createUser);

router.route('/:id')
    .put(protect, authorize('Superadmin', 'Admin'), updateUser)
    .delete(protect, authorize('Superadmin', 'Admin'), deleteUser);

export default router;
