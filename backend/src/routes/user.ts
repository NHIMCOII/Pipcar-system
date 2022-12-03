import { Router } from 'express';
import {
  requireLogin,
  requireRole,
  validateRequest,
} from '@pippip/pip-system-common';
import validator from '../middlewares/validator';

import userController from '../controllers/user';
const router = Router();

router.post(
  '/register',
  requireLogin,
  requireRole(['ADMIN']),
  validator.account,
  validateRequest,
  userController.register
);
router.get(
  '/info',
  requireLogin,
  requireRole(['ADMIN', 'PM', 'ANALYST']),
  userController.getUserInfo
);

export { router as UserRouter };
