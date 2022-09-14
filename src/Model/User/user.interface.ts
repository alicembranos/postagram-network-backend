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
  comparePassword?: (candiatePassword: string) => Promise<Boolean>;
}
