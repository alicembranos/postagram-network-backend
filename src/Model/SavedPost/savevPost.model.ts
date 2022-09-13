import mongoose from 'mongoose';
import ISavedPost from './savedPost.interface';

const { Schema, Model } = mongoose;

const savedPostSchema = new Schema<ISavedPost>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  { timestamps: true },
);


const SavedPostModel = new Model('SavedPost', savedPostSchema);

export default SavedPostModel;