import mongoose from 'mongoose';
import IComment from './comment.interface';
import autopopulate from '@/Helpers/autopopulate';

const { Schema } = mongoose;

const commentSchema = new Schema<IComment>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
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
    },
  ],
});

//create loop
commentSchema
  .pre('findOne', () => {
    autopopulate('author');
  })
  .pre('find', () => {
    autopopulate('author');
  })
  .pre('findOne', () => {
    autopopulate('comments');
  })
  .pre('find', () => {
    autopopulate('comments');
  });

const CommentModel = mongoose.model<IComment>('Comment', commentSchema);
