import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamService.getAll();
      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const team = await TeamService.getById(Number(id));
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}

export default TeamController;
