import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/MatcheService';

class MatcheController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const filter = Object.values(req.query);

    try {
      if (filter.length === 0) {
        const matcheList = await MatcheService.getAll();
        return res.status(200).json(matcheList);
      }

      const inProgress = filter[0] === 'true';
      const matcheList = await MatcheService.getFilteredMatches(inProgress);

      return res.status(200).json(matcheList);
    } catch (err) {
      next(err);
    }
  }
}

export default MatcheController;
