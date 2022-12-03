import { Router } from "express";
import { validateRequest, currentUser } from "@pippip/pip-system-common";
import validator from "../middlewares/validator";

import authController from "../controllers/auth";

const router = Router();

router.post(
  "/user/login",
  validator.loginPassword,
  validateRequest,
  authController.userLogin,
  currentUser
);

export { router as AuthRouter };
