import { Request, Response } from 'express';
import { createUser, retrieveUsers } from '../services/userServices';
import { validateEmail } from '../utils/helper';

export const initializeAccount = async (req: Request, res: Response): Promise<any> => {
  const { name, email, dues } = req.body;
  console.log(req.body) // API endpoint is called successfully

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!dues) {
    return res.status(400).json({ message: 'Amount of dues owed is required (Default can be 0)' });
  }
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Email is required and/or incorrectly formatted.' });
  }

  try {
    await createUser(name, email, dues); // Calls the service to add the user
    return res.status(201).json({ message: 'Member added successfully', newMember: name }); // Fix new nember added text
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'An error occurred', err });
  }
};

export const updateAccount = async (req: Request, res: Response): Promise<any> => {
  const { name, dues } = req.body
  
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  if (!dues) {
    return res.status(400).json({ message: 'Amount of dues owed is required' });
  }

  try {

  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "An error occurred", err })
  }


}

export const retrieveTotalMembers = async (req: Request, res: Response): Promise<any> => {
  try {
    const userCount = await retrieveUsers()
    return res.status(200).json({ count: userCount })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "An error occurred", err })
  }
}
