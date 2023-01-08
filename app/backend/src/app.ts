import * as express from 'express';
import loginRouter from './routes/loginRouter';
// import 'express-async-errors';
import teamsRouter from './routes/teamsRouter';
import matcheRouter from './routes/matcheRouter';
import ErrorMiddleware from './middlewares/errorMiddleware';
import leaderboardRoutes from './routes/leaderboard';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/login', loginRouter);
    this.app.use('/teams', teamsRouter);
    this.app.use('/matches', matcheRouter);
    this.app.use('/leaderboard', leaderboardRoutes);
    this.app.use(ErrorMiddleware.handler);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App;
