import IUser from '../User/user.interface';
import IPost from '../Post/post.interface';

export default interface ISavedPost {
  owner: IUser;
  post: IPost;
}

