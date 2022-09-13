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
        type: String,
        default: [],
      },
    ],
    comments: [
      {
        type: String,
        default: [],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('post', postSchema);