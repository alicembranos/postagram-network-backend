import { JwtPayload, verify, VerifyErrors } from 'jsonwebtoken';
import { MyRequest } from '@/Interfaces/request.interface';
import { Response, NextFunction } from 'express';
import config from '@/Config/config';

export default function authenticate(request: MyRequest, response: Response, next: NextFunction) {
  const authorization = request.headers['authorization'];

  if (!authorization)
    return response.status(401).json({ status: false, msg: 'Signup or login to continue.' });

  const token = authorization.split(' ')[1];

  verify(token, config.app.PRIVATE_KEY, (error: VerifyErrors, decode: JwtPayload | string) => {
    if (error)
      return response.status(401).json({ status: false, msg: 'Signup or login to continue.' });
    request.user = decode;
    next();
  });
}
