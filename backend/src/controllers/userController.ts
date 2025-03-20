import { Request, Response } from 'express';
import { createUser } from '../services/userServices';
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
    const newMember = await createUser(name, email, dues); // Calls the service to add the user
    return res.status(201).json({ message: 'Member added successfully', newMember: name }); // Fix new nember added text
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'An error occurred', err });
  }
};
