import { NextFunction, Request, Response } from 'express';
import Leaderboard from '../entities/classes/Leaderboard';

class LeaderboardController {
  static async getBoard(_req: Request, res: Response, next: NextFunction) {
    const result = await Leaderboard.getBoard();

    try {
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
