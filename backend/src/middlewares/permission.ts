import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@pippip/pip-system-common";
import userService from "../services/user";
// Each user can view their own profile while admin can view all
const canViewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const check_user = await userService.getUserById(req.currentUser!.id);
  const userId = req.params.userId;

  const permission = check_user!.role == "ADMIN" || check_user!.id == userId;
  if (!permission) {
    throw new NotAuthorizedError("Access Denied");
  }
  next();
};

export default { canViewProfile };
