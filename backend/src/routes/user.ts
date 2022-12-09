import { Router } from "express";
import {
  requireLogin,
  requireRole,
  validateRequest,
} from "@pippip/pip-system-common";
import validator from "../middlewares/validator";

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
  "/list",
  requireLogin,
  requireRole(["ADMIN"]),
  userController.getUserList
);

router.get(
  "/profile/:id",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  validator.objectId,
  validateRequest,
  // canViewProfile,
  userController.getUserProfile
);

router.put(
  "/profile/:id",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  validator.userAccount,
  validator.objectId,
  validateRequest,
  userController.updateUserProfile
);

router.delete(
  "/profile/:id",
  requireLogin,
  requireRole(["ADMIN"]),
  validator.objectId,
  validateRequest,
  userController.deleteUser
);

router.put(
  "/block/:id",
  requireLogin,
  requireRole(["ADMIN", "PM"]),
  validator.objectId,
  validateRequest,
  userController.blockUser
);

router.put(
  "/unblock/:id",
  requireLogin,
  requireRole(["ADMIN", "PM"]),
  validator.objectId,
  validateRequest,
  userController.unblockUser
);

export { router as UserRouter };
