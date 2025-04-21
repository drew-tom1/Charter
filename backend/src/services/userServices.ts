import supabase from '../utils/supabase';
import { compileUserInfo, User } from '../models/User';
import { Transaction } from '../models/Transaction';

export const createUser = async (user: User): Promise<any> => {
  const { name, email, amount_paid, total_balance, crossing_class, status } = user
  const newUser = await compileUserInfo(name, email, amount_paid, total_balance, crossing_class, status)

  console.log(newUser)
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ ...newUser }])
    .single();  // Fetch single record, since we're only adding one user

  if (error) throw new Error(error.message);

  return data;  // Return the new member
};

export const retrieveUserCount = async (): Promise<any> => {
  const { data, count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact'});

  if (error) {
    console.error('Error fetching row count:', error)
    return error
  }
  return count
}

export const retrieveUsers = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error('Error fetching row count:', error)
    return error
  }
  return data
}

export const updateUser = async (name: string, dues: number): Promise<any> => {
  
  const { data, error } = await supabase
    .from('users')
    .update()
    .eq('name', name)
};
