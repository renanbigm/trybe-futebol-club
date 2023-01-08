import { NextFunction, Request, Response, Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRoutes = Router();

leaderboardRoutes.get('/home', (req: Request, res: Response, next: NextFunction) =>
  LeaderboardController.getBoard(req, res, next));
leaderboardRoutes.get('/away', (req: Request, res: Response, next: NextFunction) =>
  LeaderboardController.getBoard(req, res, next));

export default leaderboardRoutes;
