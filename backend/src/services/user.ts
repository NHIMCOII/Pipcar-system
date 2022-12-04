import { User } from '../models/user';

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
      refresh_token: 'EMPTY',
    },
    { new: true }
  );
};

const getUserByPhoneRole = async (phone: string, role: string) => {
  const user_info = User.findOne({ phone, role });
  return user_info;
};
const getUserByID = async (user_id: string) => {
  const user_info = User.findOne({ _id: user_id });
  return user_info;
};

export default {
  register,
  getUserByPhoneRole,
  getUserByID,
  updateUserRefreshTokenById,
};
