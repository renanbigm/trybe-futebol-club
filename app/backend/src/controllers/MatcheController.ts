import { NextFunction, Request, Response } from 'express';
import Token from '../entities/classes/Token';
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

  static async saveMatche(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const matche = req.body;

    try {
      Token.validate(authorization as string);

      const result = await MatcheService.saveMatche(matche);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async finishMatche(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const { status, message } = await MatcheService.finishMatche(id);
      return res.status(status).json({ message });
    } catch (err) {
      next(err);
    }
  }

  static async updateMatche(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      await MatcheService.updateMatche(id, req.body);
      return res.status(200).json({ message: 'Matche update with success' });
    } catch (err) {
      next(err);
    }
  }
}

export default MatcheController;
