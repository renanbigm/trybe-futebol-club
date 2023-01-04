import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/UserModel';
// import Password from '../entities/classes/Password';
// import Email from '../entities/classes/Email';

class ValidateLogin {
  static async login(email: string, password: string): Promise<boolean> {
    const getUser = await UserModel.findOne({ where: { email } });
    if (!getUser) {
      return false;
    }

    console.log(password);
    console.log(getUser.password);
    const passIsValid = await bcrypt.compare(password, getUser.password);
    console.log(passIsValid);

    return passIsValid;
  }
}

export default ValidateLogin;
