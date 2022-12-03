import { Router } from "express";
import { requireAuth, validateRequest } from "@pippip/pip-system-common";
import validator from "../middlewares/validator";
import {requireLogin, requireRole} from '../middlewares/is-auth'

import userController from "../controllers/user";
const router = Router();

router.post(
  "/register",
  requireLogin,
  requireRole(['Admin']),
  validator.account,
  validateRequest,
  userController.register
);

export { router as UserRouter };
