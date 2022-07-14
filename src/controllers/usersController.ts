import { Request, Response } from 'express';
import UsersService from '../services/usersService';

class UsersController {
  constructor(private usersService = new UsersService()) { }

  public create = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;

    const newUser = await this.usersService.create(user);

    const token = await this.usersService.login(newUser);

    return res.status(201).json({ token });
  };
}

export default UsersController;