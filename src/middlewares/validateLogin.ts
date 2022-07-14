import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/userInterface';

const validationBody = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  if (!user.username) {
    return res.status(400).json({ message: '"username" is required' });
  }

  if (!user.password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  next();
};

export default validationBody;