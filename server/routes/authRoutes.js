import express from 'express';
const router = express.Router();
import { loginUser, registerOrg } from '../controllers/authController.js';

router.post('/login', loginUser);
router.post('/register-org', registerOrg);

export default router;
