import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/MatcheService';
// import Token from '../entities/classes/Token';
// import UserService from '../services/UserService';

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

  static async saveMatche(req: Request, res: Response, _next: NextFunction) {
    // const { authorization } = req.headers;
    const matche = req.body;

    // const token = Token.validate(authorization as string);
    // const validateToken = await UserService.validate(token.data);

    const result = await MatcheService.saveMatche(matche);
    return res.status(201).json(result);
  }
}

export default MatcheController;
