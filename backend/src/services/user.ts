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
  const list = await User.find({ role: { $ne: "ADMIN" } });
  return list;
};

const getUserByPhoneRole = async ({
  phone,
  role,
}: {
  phone: string;
  role: string;
}) => {
  const user_info = await User.findOne({ phone, role });
  return user_info;
};

const getUserById = async (user_id: string) => {
  const user_info = await User.findById(user_id);
  if (!user_info) {
    throw new DataNotFoundError();
  }
  return user_info;
};

const updateUserProfileById = async ({
  user_id,
  phone,
  name,
}: {
  user_id: string;
  phone: string;
  name: string;
}) => {
  const user = await User.findById(user_id);
  if (!user) {
    throw new DataNotFoundError();
  }
  user.phone = phone;
  user.name = name;
  const updatedUser = await user.save();
  return updatedUser;
};

const deleteUserById = async (user_id: string) => {
  await User.findByIdAndDelete(user_id);
};

const blockUserById = async (user_id: string) => {
  await User.findByIdAndUpdate(
    user_id,
    {
      status: 2,
    },
    { new: true }
  );
};

const unblockUserById = async (user_id: string) => {
  await User.findByIdAndUpdate(
    user_id,
    {
      status: 1,
    },
    { new: true }
  );
};

export default {
  register,
  getUserList,
  getUserByPhoneRole,
  getUserById,
  updateUserRefreshTokenById,
  updateUserProfileById,
  deleteUserById,
  blockUserById,
  unblockUserById,
};
