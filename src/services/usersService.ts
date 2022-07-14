import connection from '../models/connection';
import UsersModel from '../models/usersModel';
import User from '../interfaces/userInterface';

class UsersService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public create(user: User): Promise<User> {
    return this.model.create(user);
  }

  public login(user: User): Promise<string> {
    const token = this.model.login(user);
  
    return token;
  }
}

export default UsersService;