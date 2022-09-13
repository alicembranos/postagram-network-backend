import { Router } from 'express';
import { AuthController } from '@/Controllers/auth.controller';

const authRouter = Router();

//authController class
const Controller = new AuthController();

authRouter.post('/signup', (req, res) => {
  Controller.signup(req, res);
});

authRouter.post('/signin', (req, res) => {
  Controller.signin(req, res);
});

export default authRouter;