import { Router, Request, Response, NextFunction } from 'express';
import Controllers from '@/Controllers';
import authenticate from '@/Middleware/authenticate.middleware';
import { MyRequest } from '@/interfaces/Request.interface';

const postRouter = Router();
const { Post } = Controllers;

//postController class
const Controller = new Post();

postRouter.post('/post', authenticate, (req: MyRequest, res: Response, next: NextFunction) => {
  Controller.create(req, res, next);
});

//*For avoiding typescript to complain , we can use "_" underscore mark
postRouter.get('/post', (_, res: Response) => {
  Controller.getPosts(_, res);
});

postRouter.get('/post-like/:id', authenticate, (req: MyRequest, res: Response) => {});

postRouter.post('/post-comment/:id', authenticate, (req: MyRequest, res: Response) => {});

postRouter.post(
  '/post-reply-comment/:username/:id/:idx',
  authenticate,
  (req: MyRequest, res: Response) => {},
);

postRouter.get('/post/:id', (req: Request, res: Response) => {});

export default postRouter;
