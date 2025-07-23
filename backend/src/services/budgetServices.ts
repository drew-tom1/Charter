import supabase from "../utils/supabase";
import { Budget } from "../models/Budget";

export const retrieveBudget = async (): Promise<any> => {
    const { data, error } = await supabase
        .from('budget')
        .select("*")
        .single();

    if (error) {
        return error
    }
    return data
}

export const updateBudget = async (budget: Budget): Promise<any> => {
    const { data, error } = await supabase
        .from('budget')
        .update({
            allocations: budget.allocations
        })
        .eq('id', budget.id)
        .single();
    
    if (error) {
        throw error
    }
    return data

}