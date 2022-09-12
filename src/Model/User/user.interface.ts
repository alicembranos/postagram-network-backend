export default interface IUser {
  _id: string,
  username: string;
  email: string;
  password: string;
  fullname: string;
  bio: string;
  following?: [IUser];
  followers?: [IUser];
  profile: string;
}


