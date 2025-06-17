import express from 'express';
import {
  showForgotPassword,
  handleForgotPassword,
  showResetPassword,
  handleResetPassword
} from '../controllers/resetController.js';

const router = express.Router();

router.get('/forgot-password', showForgotPassword);
router.post('/forgot-password', handleForgotPassword);

router.get('/reset-password/:token', showResetPassword);
router.post('/reset-password/:token', handleResetPassword);

export default router;