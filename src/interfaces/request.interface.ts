import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface MyRequest extends Request {
  user: JwtPayload | string;
}
