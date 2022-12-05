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
  validator.userAccount,
  validateRequest,
  userController.register
);

router.get(
  "/list",
  requireLogin,
  requireRole(["ADMIN"]),
  userController.getUserList
);

router.get(
  "/profile/:userId",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  // canViewProfile,
  userController.getUserProfile
);

router.put(
  "/profile/:userId",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  validator.userAccount,
  validateRequest,
  userController.updateUserProfile
);

export { router as UserRouter };
