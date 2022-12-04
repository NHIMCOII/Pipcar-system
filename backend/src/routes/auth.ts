import { Router } from "express";
import {
  requireLogin,
  requireRole,
  validateRequest,
} from "@pippip/pip-system-common";
import validator from "../middlewares/validator";

import authController from "../controllers/auth";

const router = Router();

router.post(
  "/user/login",
  validator.loginPassword,
  validateRequest,
  authController.userLogin
);
router.post(
  "/user/logout",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  authController.userLogout
);
router.post(
  "/user/access_token",
  requireLogin,
  requireRole(["ADMIN", "PM", "ANALYST"]),
  validator.refreshToken,
  validateRequest,
  authController.getAccessToken
);

export { router as AuthRouter };
