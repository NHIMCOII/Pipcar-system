import { Request, Response } from 'express';
import { BadRequestError, DataNotFoundError } from '@pippip/pip-system-common';
import { compare } from 'bcrypt';

import authService from '../services/auth';
import userService from '../services/user';

const userLogin = async (req: Request, res: Response) => {
  const { phone, password, role } = req.body;
  const check_user = await userService.getUserByPhoneRole(phone, role);
  if (!check_user) {
    throw new DataNotFoundError();
  }

  const isEqual = await compare(password, check_user.password);
  if (!isEqual) {
    throw new BadRequestError('Wrong password');
  }

  //Service đăng nhập
  const { access_token, refresh_token, user } = await authService.signJWT({
    id: check_user._id,
    phone: check_user.phone,
    name: check_user.name,
    role: check_user.role,
    status: check_user.status,
  });

  //Gán cookie req
  req.session = {
    access_token,
  };

  //Gán thông tin người dùng vào req
  req.currentUser = user;

  //Thành công trả về RT  một lần duy nhất
  res.status(200).send({
    response_status: 1,
    message: 'Login Successful',
    data: {
      refresh_token,
    },
  });
};
const userLogout = async (req: Request, res: Response) => {
  await userService.updateUserRefreshTokenById(req.currentUser!.id);
  req.currentUser = null;
  req.session = null;
  res.send({
    response_status: 1,
    message: 'Logout successful.',
  });
};
const getRefreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  const access_token = await authService.getRefreshToken(refresh_token);
  if (access_token) {
    req.session = {
      access_token,
    };
    res.send({
      status: 1,
      message: 'Refresh Token successful.',
    });
  } else {
    throw new BadRequestError('Invalid Refresh Token.');
  }
};
export default { userLogin, userLogout, getRefreshToken };
