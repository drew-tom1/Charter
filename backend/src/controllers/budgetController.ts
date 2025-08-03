import { Request, Response } from "express";
import { retrieveBudget, updateBudget,  } from "../services/budgetServices.js";
import { Budget } from "../models/Budget";


export const getBudget = async (req: Request, res: Response): Promise<any> => {
    try {
        const budgetDetails = await retrieveBudget();
        return res.status(200).json(budgetDetails);
    } catch (err) {
        return res.status(500).json({ message: "An error occured while trying to retrieve budget details", err})
    }
}

export const putBudget = async (req: Request<{}, {}, Budget>, res: Response): Promise<any> => {
    try {
        const updateRequest = req.body;
        const updatedBudgetDetails = await updateBudget(updateRequest)
        return res.status(200).json(updatedBudgetDetails)
    } catch(err) {
        return res.status(500).json({ message: "An error occurred while trying to update budget details", err})
    }
} 