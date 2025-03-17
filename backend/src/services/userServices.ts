import supabase from '../utils/supabase';
import { compileUserInfo, User } from '../models/User';

export const createUser = async (name: string, email: string): Promise<any> => {
  const newUser = await compileUserInfo(name, email)

  const { data, error } = await supabase
    .from('users')
    .insert([{ ...newUser }])
    .single();  // Fetch single record, since we're only adding one user

  if (error) throw new Error(error.message);

  return data;  // Return the new member
};
