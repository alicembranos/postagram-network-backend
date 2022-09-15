import IUser from '../User/user.interface';

export default interface IPost {
  media: Array<string>;
  caption: string;
  author: IUser;
  likes: Array<string>;
  comments: Array<TComment>;
}

export interface TComment  {
  username: string;
  comment: string;
  likes: number;
  replies: Array<string>;
};
