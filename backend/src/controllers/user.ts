import { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthenticateError,
} from "@pippip/pip-system-common";
import userService from "../services/user";
// import  config  from "config";
import { hashPassword } from "../utils/security";

const register = async (req: Request, res: Response) => {
  const { phone, name, password, role } = req.body;
  const check_user = await userService.getUserByPhoneRole(phone, role);
  if (role == "ADMIN") {
    throw new BadRequestError("You cant register admin account");
  }

  if (check_user) {
    throw new BadRequestError(
      "This account is already registered, please pick a different one"
    );
  }

  const hashed_password = await hashPassword(password);
  const newUser = await userService.register({
    phone: phone,
    name: name,
    password: hashed_password,
    role,
  });
  res.status(200).json({
    response_status: 1,
    message: "New user created",
    user: newUser,
  });
};

const getUserInfo = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthenticateError("You are not authenticated.");
  }
  const userId = req.params.userId;
  const user = await userService.getUserById(userId);
  res.json({
    response_status: 1,
    message: "Get User Info successful.",
    data: {
      user: user,
    },
  });
};

export default { register, getUserInfo };
