import { NextFunction, Request, Response } from 'express';
import Token from '../entities/classes/Token';
import UserService from '../services/UserService';

class UserController {
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    try {
      const { status, message } = await UserService.login(email, password);

      return res.status(status).json({ token: message });
    } catch (err) {
      next(err);
    }
  }

  static async validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    const token = Token.validate(authorization as string);

    try {
      const { status, message } = await UserService.validate(token.data);

      res.status(status).json({ role: message });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
