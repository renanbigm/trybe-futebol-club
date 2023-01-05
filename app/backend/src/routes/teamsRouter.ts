import { NextFunction, Request, Response, Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  TeamController.getAll(req, res, next));
teamsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  TeamController.getById(req, res, next));

export default teamsRouter;
