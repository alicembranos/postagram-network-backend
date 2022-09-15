import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface MyRequest extends Request {
  token: JwtPayload;
}
