import supabase from '../utils/supabase';
import { compileUserInfo, User } from '../models/User';
import { Transaction } from '../models/Transaction';

export const createUser = async (name: string, email: string, dues: number | null): Promise<any> => {
  const newUser = await compileUserInfo(name, email)

  if (dues) { // fold this into compileUserInfo function at a later date. Functionality is separate.
    newUser.total_due += dues
  }
  console.log(dues)
  console.log(newUser.total_due)

  const { data, error } = await supabase
    .from('users')
    .insert([{ ...newUser }])
    .single();  // Fetch single record, since we're only adding one user

  if (error) throw new Error(error.message);

  return data;  // Return the new member
};

export const retrieveUsers = async (): Promise<any> => {
  console.log("CHECKPOINT 2")
  const { data, count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact'});

  if (error) {
    console.error('Error fetching row count:', error)
    return error
  }
  console.log("CHECKPOINT 3")
  console.log(count)
  return data
}

export const updateUser = async (name: string, dues: number): Promise<any> => {
  
  const { data, error } = await supabase
    .from('users')
    .update()
    .eq('name', name)
};
