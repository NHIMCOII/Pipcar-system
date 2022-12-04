import { Router } from "express";
import {
  requireLogin,
  requireRole,
  validateRequest,
} from "@pippip/pip-system-common";
import validator from "../middlewares/validator";
// import canViewProfile from '../middlewares/permission'

import userController from "../controllers/user";
const router = Router();

router.post(
  "/register",
  requireLogin,
  requireRole(["ADMIN"]),
  validator.userAccount,
  validateRequest,
  userController.register
);
router.get(
  "/info/:userId",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  // canViewProfile,
  userController.getUserInfo
);

export { router as UserRouter };
