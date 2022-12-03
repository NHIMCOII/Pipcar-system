import { Request, Response } from "express";
import { BadRequestError } from "@pippip/pip-system-common";
import userService from '../services/user'
// import  config  from "config";
import { hashPassword } from '../utils/helper'

import {User} from '../models/user'

const register = async (req:Request,res:Response) => {
    const {phone,name,password,role} = req.body
    const check_user = await User.findOne({phone: phone,role: role})
    if(check_user){
        throw new BadRequestError('This account is already registered, please pick a different one')
    }
    const hashed_password = await hashPassword(password)
    const newUser = await userService.register({phone:phone,name:name,password:hashed_password,role});
    res.status(201).json({message: "New user created",user: newUser})
}
 
export default {register}