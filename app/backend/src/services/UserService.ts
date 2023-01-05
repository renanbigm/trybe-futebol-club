import * as bcrypt from 'bcryptjs';
import HttpException from '../utils/HttpExecption';
import UserModel from '../database/models/UserModel';
import Token from '../entities/classes/Token';

class UserService {
  static async login(email: string, password: string) {
    const user = await UserService.getUser(email);

    const passIsValid = await bcrypt.compare(password, user.password);

    if (!passIsValid) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    const token = Token.create(email);

    return { status: 200, message: token };
  }

  static async validate(user: string) {
    const User = await UserService.getUser(user);

    return { status: 200, message: User.role };
  }

  static async getUser(email: string) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(401, 'Incorrect email or password');
    }
    return user;
  }
}

export default UserService;
