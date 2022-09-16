import mongoose from 'mongoose';
import IPost from './post.interface';

const { Schema } = mongoose;

const postSchema = new Schema<IPost>(
  {
    media: [
      {
        type: String,
        required: true,
      },
    ],
    caption: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [],
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: [],
      },
    ],
  },
  { timestamps: true },
);

const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;
