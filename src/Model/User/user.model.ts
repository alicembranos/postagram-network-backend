import mongoose from 'mongoose';
import IUser from './user.interface';
import bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import autopopulate from '@/Helpers/autopopulate';

const { Schema } = mongoose;

export const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [6, 'Username must have at least 6 characters'],
      maxlength: [50, 'Username can not have more than 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      //validate password with ajv or joi
    },
    firstName: {
      type: String,
      required: [true, 'The first name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'The last name is required'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    profile: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        default:[]
      },
    ],
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

//Create virtual fullname property
userSchema.virtual('fullname').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

//Middleware to save encrypted password if it has been modified
userSchema.pre('save', async function passwordPreSave(next : NextFunction) {
  if (!this.isModified('password')) return next();

  try {
    //Random additional data
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    return next();
  } catch (error : unknown) {
    next(error);
  }
});

//Compare a candidate password with the user's password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error : unknown) {
    return false;
  }
};

userSchema.pre('find', () => autopopulate("following"))
  .pre('findOne', () => autopopulate("following"))
  .pre('find', () => autopopulate("followers"))
  .pre('findOne', () => autopopulate("followers"))
  .pre('find', () => autopopulate("posts"))
  .pre('findOne', () => autopopulate("posts"))

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
