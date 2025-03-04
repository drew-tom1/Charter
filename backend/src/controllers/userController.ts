import { Request, Response } from 'express';
import { createUser } from '../services/userServices';

export const initializeAccount = async (req: Request, res: Response) => {
  const { name, dues } = req.body;

  if (!name || dues === undefined) {
    return res.status(400).json({ message: 'Name and dues are required' });
  }

  try {
    const newMember = await createUser(name, dues); // Calls the service to add the user
    return res.status(201).json({ message: 'Member added successfully', newMember });
  } catch (err) {
    return res.status(500).json({ message: 'An error occurred', err });
  }
};
