import { Request, Response } from 'express';
import { createUser } from '../services/userServices';

export const initializeAccount = async (req: Request, res: Response): Promise<any> => {
  const { name } = req.body;
  console.log(req.body) // API endpoint is called successfully

  if (!name) {
    return res.status(400).json({ message: 'Name are required' });
  }

  try {
    const newMember = await createUser(name); // Calls the service to add the user
    return res.status(201).json({ message: 'Member added successfully', newMember });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'An error occurred', err });
  }
};
