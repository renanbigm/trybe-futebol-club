import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';

const loginRouter = Router();

loginRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  UserController.login(req, res, next));
loginRouter.get('/validate', (req: Request, res: Response, next: NextFunction) =>
  UserController.validate(req, res, next));

export default loginRouter;
