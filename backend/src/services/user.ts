import { User } from "../models/user";
import { DataNotFoundError } from "@pippip/pip-system-common";
import user from "../controllers/user";

const register = async ({
  phone,
  name,
  password,
  role,
}: {
  phone: string;
  name: string;
  password: string;
  role: string;
}) => {
  const user = User.build({ phone, name, password, role });
  return await user.save();
};

const updateUserRefreshTokenById = async (user_id: string) => {
  await User.findByIdAndUpdate(
    user_id,
    {
      refresh_token: "EMPTY",
    },
    { new: true }
  );
};

const getUserList = async () => {
  const list = await User.find();
  return list;
};

const getUserByPhoneRole = async (phone: string, role: string) => {
  const user_info = await User.findOne({ phone, role });
  if(!user_info){
    throw new DataNotFoundError()
  }
  return user_info;
};

const getUserById = async (user_id: string) => {
  const user_info = await User.findById(user_id);
  if(!user_info){
    throw new DataNotFoundError()
  }
  return user_info;
};

const updateUserProfileById = async ({
  user_id,
  phone,
  name,
  role,
}: {
  user_id: string;
  phone: string;
  name: string;
  role: string;
}) => {
  const user = await User.findById(user_id)
  if(!user){
    throw new DataNotFoundError()
  }
  user.phone = phone;
  user.name = name;
  user.role = role;
  const updatedUser = await user.save()
  return updatedUser;
};

export default {
  register,
  getUserList,
  getUserByPhoneRole,
  getUserById,
  updateUserRefreshTokenById,
  updateUserProfileById,
};
