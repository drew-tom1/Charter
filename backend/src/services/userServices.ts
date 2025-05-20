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
  const { count, error } = await supabase
    .from('users')
    .select('*', { count: 'exact'});

  if (error) {
    console.error('Error fetching row count:', error)
    return error
  }
  return count
}

export const retrieveAvailableFunds = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('chapter_funds')
    .select('current_funds')
    .single();

  if (error) {
    console.error('Error fetching row count:', error)
    return error
  }
  return data
}

export const retrieveTotalBalance = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('chapter_funds')
    .select('total_funds_possible')
    .single();

  if (error) {
    console.error('Error fetching total funds:', error)
    return error
  }
  return data
}

export const retrieveListOfUsers = async (): Promise<any> => {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error('Error fetching row count:', error)
    return error
  }
  return data
}

export const updateUser = async (id: string, email: string | null, status: string | null, crossing_class: string | null, amount_paid: number | null, total_balance: number | null): Promise<any> => {
  
  const { data, error } = await supabase
    .from('users')
    .update({ email, status, crossing_class, amount_paid, total_balance })
    .eq('id', id)
  
  if (error) { 
    return error
  }
  return data
};

export const deleteUser = async (id: string): Promise<any> => {
  console.log(id)
  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('id', id)

  return { data, error }
}
