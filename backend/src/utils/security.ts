import { genSaltSync, hash } from 'bcrypt';
import config from 'config';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = genSaltSync();
  const hashed_password = await hash(password, salt);
  return hashed_password;
};
