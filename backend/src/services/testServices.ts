import supabase from '../utils/supabase';

export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('users') // Replace with the name of ANY existing table
      .select('id')
      .limit(1);

    if (error) {
      console.error('Supabase connection test failed:', error);
      return false;
    }

    console.log('Supabase connection test successful.');
    return true;
  } catch (error) {
    console.error('Error during Supabase connection test:', error);
    return false;
  }
};