import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpExecption';

class ErrorMiddleware {
  static handler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof Error) {
      const { status, message } = error as HttpException;
      return res.status(status || 500).send({ message });
    }
    return res.status(500).send('Erro não definido');
  }
}

export default ErrorMiddleware;

// class ErrorMiddleware {
//   static httpError(
//     error: Error,
//     _req: Request,
//     res: Response,
//     _next: NextFunction,
//   ) {
//     const { status, message } = error as HttpException;

//     return res.status(status || 500).json({ message });
//   }
// }
