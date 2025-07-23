import express, { Router } from 'express';
import { getBudget, putBudget } from '../controllers/budgetController';

const budgetRouter = express.Router()

budgetRouter.get('/get-budget', getBudget)
budgetRouter.put('/update-budget', putBudget)

export default budgetRouter