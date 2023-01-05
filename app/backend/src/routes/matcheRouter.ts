import { NextFunction, Request, Response, Router } from 'express';
import MatcheController from '../controllers/MatcheController';

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  MatcheController.getAll(req, res, next));

export default matcheRouter;
