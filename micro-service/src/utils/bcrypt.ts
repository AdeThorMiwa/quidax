import { BCRYPT_SALT } from '@constants/app';
import { hash, compare } from 'bcryptjs';

export const encrypt = async (password: string): Promise<string> => {
  return await hash(password, BCRYPT_SALT);
};

export const verify = async (password: string, encrypted: string) => {
  return await compare(password, encrypted);
};
