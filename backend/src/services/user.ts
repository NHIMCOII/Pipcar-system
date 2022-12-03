import { User } from "../models/user";

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

export default { register };
