import { Request, Response } from "express";
import {
  BadRequestError,
  NotAuthenticateError,
} from "@pippip/pip-system-common";
import { hashPassword } from "../utils/security";

import userService from "../services/user";

const register = async (req: Request, res: Response) => {
  const { phone, name, password, role } = req.body;
  const check_user = await userService.getUserByPhoneRole({ phone, role });
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
    data: { user: newUser },
  });
};

const getUserProfile = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthenticateError("You are not authenticated.");
  }
  const userId = req.params.id;
  const user = await userService.getUserById(userId);
  res.json({
    response_status: 1,
    message: "Get User Profile Successfully.",
    data: {
      user: user,
    },
  });
};

const getUserList = async (req: Request, res: Response) => {
  const list = await userService.getUserList();
  res.json({
    response_status: 1,
    message: "Get User List Successfully.",
    data: {
      list: list,
    },
  });
};

const updateUserProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { phone, name } = req.body;
  const updatedUser = await userService.updateUserProfileById({
    user_id: userId,
    phone: phone,
    name: name,
  });
  res.json({
    response_status: 1,
    message: "Update User Profile Successfully.",
    data: {
      user: updatedUser,
    },
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await userService.deleteUserById(userId);
  res.status(200).json({
    response_status: 1,
    message: "Delete User Successfully.",
  });
};

const blockUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await userService.blockUserById(userId);
  res.status(200).json({
    response_status: 1,
    message: "Block User Successfully.",
  });
};

const unblockUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  await userService.unblockUserById(userId);
  res.status(200).json({
    response_status: 1,
    message: "Unblock User Successfully.",
  });
};

export default {
  register,
  getUserProfile,
  getUserList,
  updateUserProfile,
  deleteUser,
  blockUser,
  unblockUser,
};
