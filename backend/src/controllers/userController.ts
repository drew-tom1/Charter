import { Request, Response } from 'express';
import { createUser, deleteUser, retrieveAvailableFunds, retrieveListOfUsers, retrieveTotalBalance, retrieveUserCount, updateUser } from '../services/userServices';
import { validateEmail } from '../utils/helper';
import { User } from '../models/User';

export const initializeAccount = async (req: Request<{}, {}, User>, res: Response): Promise<any> => {
  const { name, email, amount_paid, total_balance, crossing_class, status } = req.body;
  console.log(req.body) // API endpoint is called successfully

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Email is required and/or incorrectly formatted.' });
  }
  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }
  if (!crossing_class) {
    return res.status(400).json({ message: 'Crossing Class is required' });
  }

  try {
    await createUser(req.body); // Calls the service to add the user
    return res.status(201).json({ message: 'Member added successfully', newMember: name }); // Fix new nember added text
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'An error occurred', err });
  }
};

export const updateAccount = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  const { email, status, crossing_class, amount_paid, total_balance } = req.body
  
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    await updateUser(id, email, status, crossing_class, amount_paid, total_balance)
    return res.status(200).json({ message: "Member successfully updated" })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "An error occurred", err })
  }


}

export const deleteAccount = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params
  
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  try {
    await deleteUser(id)
  } catch (err) {
    return res.status(500).json({ message: "An error occurred", err })
  }


}

export const retrieveSectionCardsInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    
    const userCount = await retrieveUserCount()
    const total = await retrieveTotalBalance()
    const available = await retrieveAvailableFunds()

    return res.status(200).json({ 
      count: userCount, 
      totalFunds: total.total_funds_possible, 
      netFunds: available.current_funds, 
      outstandingBalance: (total.total_funds_possible - available.current_funds)
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "An error occurred", err })
  }
}

export const retrieveMemberList = async (req: Request, res: Response): Promise<any> => {
  try {
    const usersList = await retrieveListOfUsers()
    return res.status(200).json({ usersList })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "An error occurred", err })
  }
}
