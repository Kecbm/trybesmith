import { Request, Response } from 'express';
import LoginService from '../services/loginService';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public enter = async (req: Request, res: Response): Promise<Response> => {
    const user = req.body;

    const token = await this.loginService.enter(user);

    if (!token) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }

    return res.status(200).json({ token });
  };
}

export default LoginController;