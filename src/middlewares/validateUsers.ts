import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/userInterface';

const validationUsername = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  if (!user.username) {
    return res.status(400).json({ message: '"username" is required' });
  }

  if (typeof user.username !== 'string') {
    return res.status(422).json({ message: '"username" must be a string' });
  }

  if (user.username.length < 2 || user.username.length === 2) {
    return res.status(422)
      .json({ message: '"username" length must be at least 3 characters long' });
  }

  next();
};

const validationClasse = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  if (!user.classe) {
    return res.status(400).json({ message: '"classe" is required' });
  }

  if (typeof user.classe !== 'string') {
    return res.status(422).json({ message: '"classe" must be a string' });
  }

  if (user.classe.length < 2 || user.classe.length === 2) {
    return res.status(422)
      .json({ message: '"classe" length must be at least 3 characters long' });
  }

  next();
};

const validationLevel = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;
  
  if (user.level < 0 || user.level === 0) {
    return res.status(422)
      .json({ message: '"level" must be greater than or equal to 1' });
  }

  if (!user.level) {
    return res.status(400).json({ message: '"level" is required' });
  }

  if (typeof user.level !== 'number') {
    return res.status(422).json({ message: '"level" must be a number' });
  }

  next();
};

const validationPassword = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body;

  if (!user.password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (typeof user.password !== 'string') {
    return res.status(422).json({ message: '"password" must be a string' });
  }

  if (user.password.length < 8) {
    return res.status(422)
      .json({ message: '"password" length must be at least 8 characters long' });
  }

  next();
};

export {
  validationUsername,
  validationClasse,
  validationLevel,
  validationPassword,
};