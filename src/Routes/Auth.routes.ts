import { Router, Request, Response, NextFunction } from 'express';
import Controllers from '@/Controllers';

const authRouter = Router();
const { Authorize } = Controllers;

//authController class
const Controller = new Authorize();

authRouter.post('/signup', (req : Request, res : Response, next: NextFunction) => {
  //?include validation middleware
  Controller.signup(req, res, next);
});

authRouter.post('/signin', (req: Request, res:Response) => {
  Controller.signin(req, res);
});

export default authRouter;
