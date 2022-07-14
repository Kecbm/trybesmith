import { Pool, ResultSetHeader } from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import User from '../interfaces/userInterface';

class UsersModel {
  public connection: Pool;

  private TOKEN_SECRET: string;

  constructor(connection: Pool) {
    this.connection = connection;
    this.TOKEN_SECRET = 'userTrybesmith';
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async login(user: User): Promise<string> {
    const { username, classe, level } = user;

    const newUser = {
      username,
      classe,
      level,
    };

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    } as jwt.SignOptions;

    const token = jwt.sign({ user: newUser }, this.TOKEN_SECRET, jwtConfig);

    return token;
  }
}

export default UsersModel;