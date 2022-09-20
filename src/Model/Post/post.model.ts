import autopopulate from '@/Helpers/autopopulate';
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
      required: true,
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

postSchema.pre('find', () => autopopulate("author"))
  .pre('findOne', () => autopopulate("author"))
  .pre('find', () => autopopulate("likes"))
  .pre('findOne', () => autopopulate("likes"))
  .pre('find', () => autopopulate("comments"))
  .pre('findOne', () => autopopulate("comments"))

const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;
