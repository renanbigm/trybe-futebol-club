import * as jwt from 'jsonwebtoken';
import HttpException from '../../utils/HttpExecption';
// import ILogin from '../interfaces/ILogin';

const secret = process.env.JWT_SECRET;

class Token {
  static create(user: string): string {
    const jwtConfig: object = { expiresIn: '7d', algorithm: 'HS256' };

    return jwt.sign({ data: user }, secret as string, jwtConfig);
  }

  static validate(token: string) {
    const isValid = jwt.decode(token);

    if (!isValid) {
      throw new HttpException(401, 'Invalid token');
    }

    return isValid as jwt.JwtPayload;
  }
}

export default Token;
