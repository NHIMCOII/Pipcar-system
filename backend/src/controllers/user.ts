import { Request, Response } from 'express';
import {
  BadRequestError,
  NotAuthenticateError,
} from '@pippip/pip-system-common';
import userService from '../services/user';
// import  config  from "config";
import { hashPassword } from "../utils/security";
import user from "../services/user";

const register = async (req: Request, res: Response) => {
  const { phone, name, password, role } = req.body;
  const check_user = await userService.getUserByPhoneRole(phone, role);
  if (role == 'ADMIN') {
    throw new BadRequestError('You cant register admin account');
  }

  if (check_user) {
    throw new BadRequestError(
      'This account is already registered, please pick a different one'
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
    message: 'New user created',
    user: newUser,
  });
};

const getUserProfile = async (req: Request, res: Response) => {
  if (!req.currentUser) {
    throw new NotAuthenticateError('You are not authenticated.');
  }
  const user = await userService.getUserById(req.currentUser.id);
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
  const userId = req.params.userId;
  const { phone, name, password, role } = req.body;
  const updatedUser = await userService.updateUserProfileById({
    user_id: userId,
    phone: phone,
    name: name,
    role: role,
  });
  res.json({
    response_status: 1,
    message: "Update User Profile Successfully.",
    data: {
      user: updatedUser,
    },
  });
};

export default { register, getUserProfile, getUserList, updateUserProfile };
