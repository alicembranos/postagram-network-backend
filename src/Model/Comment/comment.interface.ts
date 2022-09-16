import IUser from '../User/user.interface';

export default interface IComment {
  author: IUser;
  content: string;
  likes: [IUser];
  comments: [IComment];
}
