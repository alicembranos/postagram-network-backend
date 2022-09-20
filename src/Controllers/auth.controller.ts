import { NextFunction, Request, Response } from 'express';
import formidable, { Fields } from 'formidable';
import config from '@/Config/config';
import { fileUpload } from '../Services/cloudinary/config';
import db from '../Model';
import { sign } from 'jsonwebtoken';

interface Auth {
  //Promise<Response<any, Record<string, any>>>
  signup(request: Request, response: Response, next: NextFunction): void;
  signin(request: Request, response: Response): Promise<Response<any, Record<string, any>>>;
}

export class AuthController implements Auth {
  signup(request: Request, response: Response, next: NextFunction) {
    //TODO: Validation user data, middleware?
    //TODO change to json data , file???
    const formData = formidable({});
    formData.parse(request, async (err: unknown, fields: Fields, files: any) => {
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
          return response.status(400).json({ status: false, msg: 'All fields are required' });
        }

        //Check if the user already exists in the db
        const emailExist = await db.User.findOne({ email: email });
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
          data: {
            username: newUser.username,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            bio: newUser.bio,
            profile: newUser.profile,
            following: newUser.following,
            followers: newUser.followers,
            posts: newUser.posts
          }, //? maybe would be good to create a function to sanitize user (remove createdAt, updatedAt, etc)
        });
      } catch (error) {
        config.logger.error(error);
        return response.status(500).json({ status: false, msg: error.message });
      }
    });
  }

  async signin(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password)
      return response.status(400).json({ status: false, msg: 'All fields are required.' });

    try {
      //if we use exec it will return a promise, otherwise, it will return a "thenable"
      const user = await db.User.findOne({ email: email }).exec();

      if (!user)
        return response
          .status(400)
          .json({ status: false, msg: 'User not registered. Please sign up.' });

      const userLogged = new db.User(user);
      const isPasswordValid = await userLogged.comparePassword(password);

      if (!isPasswordValid)
        return response.status(400).json({ status: false, msg: 'Invalid password.' });

      const token_payload = {
        _id: userLogged._id,
        username: userLogged.username,
      };

      //!json web token expires in 1hour
      const token = sign(token_payload, config.app.PRIVATE_KEY, { expiresIn: '3600s' });

      return response.json({ status: true, msg: 'User logged', jwt: token });
    } catch (error) {
      config.logger.error(error);
      return response.status(500).json({ status: false, msg: error.message });
    }
  }
}
