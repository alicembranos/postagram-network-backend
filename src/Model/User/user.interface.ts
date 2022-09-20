import { Model } from 'mongoose';
import IPost from '../Post/post.interface';

export default interface IUser {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  following?: Array<IUser>;
  followers?: Array<IUser>;
  profile: string;
  posts?: Array<IPost>;
}

export interface IUserMethods {
  comparePassword: (candiatePassword: string) => Promise<Boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;
