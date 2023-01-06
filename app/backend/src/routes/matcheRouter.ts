import { NextFunction, Request, Response, Router } from 'express';
import MatcheController from '../controllers/MatcheController';

const matcheRouter = Router();

matcheRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  MatcheController.getAll(req, res, next));
matcheRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  MatcheController.saveMatche(req, res, next));
// matcheRouter.patch('/:id', (req: Request, res: Response, next: NextFunction) =>
//   MatcheController.finishMatche(req, res, next));
matcheRouter.patch('/:id/finish', (req: Request, res: Response, next: NextFunction) =>
  MatcheController.finishMatche(req, res, next));

export default matcheRouter;
