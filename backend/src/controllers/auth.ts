import { NextFunction, Request, Response } from "express";
import { BadRequestError, DataNotFoundError } from "@pippip/pip-system-common";
import { compare } from "bcrypt";

import authService from "../services/auth";

import { User } from "../models/user";

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { phone, password, role } = req.body;
  const check_user = await User.findOne({ phone: phone, role: role });
  if (!check_user) {
    throw new DataNotFoundError();
  }

  const isEqual = await compare(password, check_user.password);
  if (!isEqual) {
    throw new BadRequestError("Wrong password");
  }

  const {access_token, refresh_token} = await authService.signJWT({id: check_user._id,phone: check_user.phone,name: check_user.name,role: check_user.role,status: check_user.status})
  req.session = {
    access_token,
    refresh_token
  }
  next();
  // res.status(200).json({message: "Login Sucessfully"})
};

export default { userLogin };
