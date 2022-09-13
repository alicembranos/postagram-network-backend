import mongoose from 'mongoose';
import ISavedPost from './savedPost.interface';

const { Schema } = mongoose;

const postSchema = new Schema<ISavedPost>(
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

export default mongoose.model('post', postSchema);
