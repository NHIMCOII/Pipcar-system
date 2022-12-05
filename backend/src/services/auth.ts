import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { User } from '../models/user';

const signJWT = async ({
  id,
  name,
  phone,
  role,
  status,
}: {
  id: string;
  name: string;
  phone: string;
  role: string;
  status: number;
}) => {
  let user = {
    id,
    phone,
    name,
    role,
    status,
  };
  const access_token = jwt.sign(
    user,
    process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXP,
    }
  );
  const refresh_token = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXP,
    }
  );

  await User.findByIdAndUpdate(id, { refresh_token }, { new: true });
  return {
    access_token,
    refresh_token,
    user,
  };
};

const getAccessToken = async (refresh_token: string) => {
  const checkRT = await User.exists({ refresh_token });
  if (checkRT) {
    const user_info = await User.findById(checkRT._id);
    const user = {
      id: user_info!._id,
      phone: user_info!.phone,
      name: user_info!.name,
      role: user_info!.role,
      status: user_info!.status,
    };
    const access_token = jwt.sign(
      user,
      process.env.ACCESS_TOKEN_SECRET as jwt.Secret,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXP,
      }
    );
    return access_token;
  } else {
    return null;
  }
};

export default { signJWT, getAccessToken };
