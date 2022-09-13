import IUser from '../User/user.interface';

export default interface IPost {
  media: Array<string>;
  caption: string;
  author: IUser;
  likes: Array<string>;
  comments: Array<string>;
}
