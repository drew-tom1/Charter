import supabase from '../utils/supabase';
import { User } from '../models/User';

export const createUser = async (name: string, dues: number): Promise<any> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, dues }])
    .single();  // Fetch single record, since we're only adding one user

  if (error) throw new Error(error.message);

  return data;  // Return the new member
};
