import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';
import config from '@/Config/config';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { fileUpload } from '../Services/cloudinary/config';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

interface Auth {
  //Promise<Response<any, Record<string, any>>>
  signup(request: Request, response: Response, next: NextFunction): void;
  //Promise<Response<any, Record<string, any>>>
  signin(request: Request, response: Response): void;
}

export class AuthController implements Auth {
  signup (request: Request, response: Response, next: NextFunction) {
    // const { username, email, password, firstName, lastName, bio, profile } = request.body;
    const formData = formidable({ multiples: true });

    formData.parse(request, async (err: any, fields: formidable.Fields, files: any) => {
      console.log(request.body);
      if (err) {
        next(err);
        return;
      }
      const { username, email, password, firstName, lastName, bio } = fields;
      const { profile } = files;

      const profile_url = await fileUpload(profile.path); //cloudinary es asincrono
      return response.status(200).json(profile_url);
    });
  }

  signin() {}
}
