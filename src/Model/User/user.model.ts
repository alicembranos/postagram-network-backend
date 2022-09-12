import mongoose from 'mongoose';
import { isObjectBindingPattern } from 'typescript';
import IUser from './user.interface';

const { Schema } = mongoose;

const userSchema = new Schema<IUser>({
    _id: {
        type: ObjectId,
        required:true,
  },
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
  fullname: {
    type: String,
    required: [true, 'Fullname is required'],
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
  },
  following: {
    type: [userSchema],
  },
  followers: {
    type: [userSchema],
  },

  profile: {
    type: String,
  },
});
