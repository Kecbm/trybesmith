import { Pool, RowDataPacket } from 'mysql2/promise';
import User from '../interfaces/userInterface';

class UsersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async enter(user: User): Promise<User> {
    const { username, password } = user;
    const [userExists] = await this.connection.execute<RowDataPacket[]>(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );

    return userExists[0] as User;
  }
}

export default UsersModel;