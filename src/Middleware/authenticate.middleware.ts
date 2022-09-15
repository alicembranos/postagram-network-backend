import { verify } from 'jsonwebtoken';
import { MyRequest } from '@/interfaces/Request.interface';
import { Response, NextFunction } from 'express';
import config from '@/Config/config';

export default function authenticate(request: MyRequest, response: Response, next: NextFunction) {
  const token = request.headers['authorization'] as string;

  verify(token, config.app.PRIVATE_KEY, (error, token) => {
    if (error)
      return response.status(401).json({ status: false, msg: 'Signup or login to continue.' });

    request.token = token;
    next();
  });
}
