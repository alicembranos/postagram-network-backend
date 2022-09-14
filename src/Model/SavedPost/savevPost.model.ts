import mongoose from 'mongoose';
import ISavedPost from './savedPost.interface';

const { Schema } = mongoose;

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

const SavedPostModel = mongoose.model('SavedPost', savedPostSchema);

export default SavedPostModel;
