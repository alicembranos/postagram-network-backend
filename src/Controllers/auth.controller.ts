import { NextFunction, Request, Response } from 'express';
import formidable, { Fields } from 'formidable';
import config from '@/Config/config';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { fileUpload } from '../Services/cloudinary/config';
import db from '../Model';

interface Auth {
  //Promise<Response<any, Record<string, any>>>
  signup(request: Request, response: Response, next: NextFunction): void;
  //Promise<Response<any, Record<string, any>>>
  signin(request: Request, response: Response): void;
}

export class AuthController implements Auth {
  signup(request: Request, response: Response, next: NextFunction) {
    //TODO: Validation user data, middleware?
    const formData = formidable({});
    formData.parse(request, async (err: any, fields: Fields, files: any) => {
      //files is an array so we need to use any beacuse it will be only one file
      try {
        if (err) {
          next(err);
          return;
        }
        const { username, email, password, firstName, lastName, bio } = fields;
        const { profile } = files;

        //? Remove this part if we include middleware for validation data
        if (!username || !password || !email || !firstName || !lastName || !bio || !profile) {
          return response.status(400).json({ msg: 'All fields are required' });
        }

        //Check if the user already exists in the db
        const emailExist = db.User.findOne({ email: email });
        if (emailExist)
          return response.status(400).json({ status: false, msg: 'Email already exists.' });

        //upload the user profile photo file
        const profile_url = await fileUpload(profile.filepath, response); //cloudinary is asynchronous

        //!Middleware in userSchema for hash password, not needed here
        const newUser = await db.User.create({
          username: username,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          bio: bio,
          profile: profile_url,
        });

        return response.status(200).json({
          status: true,
          msg: 'User registered',
          user: {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            profile: profile_url,
          },
        });
      } catch (error) {
        return response.status(500).json({ status: false, msg: error.message });
      }
    });
  }

  signin() {}
}
