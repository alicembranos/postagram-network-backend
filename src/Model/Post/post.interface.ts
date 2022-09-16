import IComment from '../Comment/comment.interface';
import IUser from '../User/user.interface';

export default interface IPost {
  media: Array<string>;
  caption: string;
  author: IUser;
  likes: Array<IUser>;
  comments: Array<IComment>;
}
