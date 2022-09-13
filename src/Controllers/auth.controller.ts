import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';
import config from '@/Config/config';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

interface Auth {
  signup(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
  signin(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}

export class AuthController implements Auth {
  async signup(request: Request, response: Response, next: NextFunction) {
    // const { username, email, password, firstName, lastName, bio, profile } = request.body;
    const formData = formidable({ multiples: true });

    formData.parse(request, (err: any, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        next(err);
        return;
      }
      const { username, email, password, firstName, lastName, bio } = fields;
      const { profile } = files;
    });
  }
}
