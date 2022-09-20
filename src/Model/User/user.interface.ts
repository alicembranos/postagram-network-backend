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
  comparePassword?: (candiatePassword: string) => Promise<Boolean>;
}
