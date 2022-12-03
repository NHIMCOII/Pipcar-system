import { Request, Response,NextFunction } from 'express';
import { NotAuthenticateError,NotAuthorizedError } from '@pippip/pip-system-common';
const config = require("config");
import dotenv from "dotenv";
dotenv.config();

import jwt, { JwtPayload } from "jsonwebtoken";

import {User} from "../models/user";

// export interface CustomRequest extends Request {
//     user?: any;
// }

/**
 * JWT
 */
export const requireLogin = (req: Request, res:Response, next:NextFunction) => {
  if(!req.currentUser){
    throw new NotAuthenticateError("You are not authenticated.")
  }
  next()
};
/**
 * Auth Role
 * @param {[String]} roles
 */
export const requireRole = (roles: string[]) => {
  return async (req: Request, res:Response, next:NextFunction) => {
    if (
      !roles.includes(req.currentUser!.role) ||
      req.currentUser!.status != config.get("account_status.active")
    ) {
      throw new NotAuthorizedError("You are not authorized.")
    }
    next();
  };
};

