import { Router } from 'express';
import Controllers from '../Controllers/index';

const authRouter = Router();
const { Authorize } = Controllers;

//authController class
const Controller = new Authorize();

authRouter.post('/signup', (req, res, next) => {  //?include validation middleware
  Controller.signup(req, res, next);
});

authRouter.post('/signin', (req, res) => {
  Controller.signin(req, res);
});

export default authRouter;
