import jwt from "jsonwebtoken";
import config from 'config'
import dotenv from "dotenv";
dotenv.config();

import {User} from '../models/user'

const signJWT = async ({id,name,phone,role,status}:{id: string,name: string, phone: string,role: string, status: number }) => {

  let user = {
    id,
    phone,
    name,
    role,
    status
  };  
  const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, {
    expiresIn: config.get("default.access_token_exp"),
  });
  const refresh_token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as jwt.Secret, {
    expiresIn: config.get("default.refresh_token_exp"),
  });

await User.findByIdAndUpdate(id,{refresh_token},{new: true})
  return {
    access_token,
    refresh_token
  }
};

export default { signJWT };
