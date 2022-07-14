import jwt from 'jsonwebtoken';
import connection from '../models/connection';
import LoginModel from '../models/loginModel';
import User from '../interfaces/userInterface';

class LoginService {
  public model: LoginModel;

  private TOKEN_SECRET: string;

  constructor() {
    this.model = new LoginModel(connection);
    this.TOKEN_SECRET = 'userTrybesmith';
  }

  public async enter(user: User): Promise<User | string> {
    const userExists = await this.model.enter(user);
  
    if (userExists) {
      const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      } as jwt.SignOptions;
      const token = jwt.sign({ user: userExists }, this.TOKEN_SECRET, jwtConfig);
      return token;
    }

    return userExists;
  }
}

export default LoginService;