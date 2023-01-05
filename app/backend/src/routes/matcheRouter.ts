import { NextFunction, Request, Response, Router } from 'express';
import MatcheController from '../controllers/MatcheController';

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  MatcheController.getAll(req, res, next));
matcheRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  MatcheController.saveMatche(req, res, next));

export default matcheRouter;
