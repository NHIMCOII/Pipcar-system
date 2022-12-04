import jwt from "jsonwebtoken";
import config from "config";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../models/user";

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
      expiresIn: config.get("default.access_token_exp"),
    }
  );
  const refresh_token = jwt.sign(
    user,
    process.env.REFRESH_TOKEN_SECRET as jwt.Secret,
    {
      expiresIn: config.get("default.refresh_token_exp"),
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
        expiresIn: config.get("default.access_token_exp"),
      }
    );
    return access_token;
  } else {
    return null;
  }
};

export default { signJWT, getAccessToken };
