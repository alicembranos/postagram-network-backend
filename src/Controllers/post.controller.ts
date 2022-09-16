import { Request, Response, NextFunction } from 'express';
import { MyRequest } from '../interfaces/request.interface';
import formidable, { Fields, File, Files } from 'formidable';
import config from '@/Config/config';
import { fileUpload } from '../Services/cloudinary/config';
import db from '../Model';

interface Post {
  create(request: MyRequest, response: Response, next: NextFunction): void;
  getPosts(_, response: Response): Promise<Response<any, Record<string, any>>>;
  likePost(request: MyRequest, response: Response): Promise<Response<any, Record<string, any>>>;
  commentPost(request: MyRequest, response: Response): Promise<Response<any, Record<string, any>>>;
}

export class PostController implements Post {
  //create post
  create(request: MyRequest, response: Response, next: NextFunction) {
    //TODO: authentication token middleware
    const formData = formidable({});
    //? Does next neccesary?
    formData.parse(request, async (err: any, fields: Fields, files: Files) => {
      try {
        if (err) {
          next(err);
          return;
        }

        const token = request.token;
        const authorId = token._id;
        const { caption } = fields;
        const mediaUrls = [];

        //Upload image/images
        const filesPromises = Object.keys(files).map(async fileItem => {
          const filePath = (files[fileItem] as File).filepath;
          const urlFile = await fileUpload(filePath, response);
          console.log('urlFile', urlFile);
          mediaUrls.push(urlFile);
        });

        //wait for the array of promises
        //!If we want to avoid this, we could use a simple loop as for, while etc, but code will be longer
        await Promise.all(filesPromises);

        const newPost = await db.Post.create({
          media: mediaUrls,
          caption: caption,
          author: authorId,
        });

        return response
          .status(201)
          .json({ status: true, msg: 'Post created succesfully', data: { post: newPost } });
      } catch (error) {
        config.logger.error(error);
        return response.status(500).json({ status: false, msg: error.message });
      }
    });
  }

  //get posts
  async getPosts(_, response: Response) {
    try {
      const posts = await db.Post.find({}).exec();

      return response
        .status(200)
        .json({ status: true, msg: 'Posts fetched succesfully', data: { posts: posts } });
    } catch (error) {
      config.logger.error(error);
      return response.status(500).json({ status: false, msg: error.message });
    }
  }

  //toggle like post
  async likePost(request: MyRequest, response: Response) {
    const token = request.token;
    const authorId = token._id;
    const postId = request.params.id;
    try {
      const post = await db.Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      let likes = [];

      if (!post.likes) {
        likes = [authorId];
      } else if (!post.likes.includes(authorId)) {
        likes = [...post.likes, authorId];
      } else {
        const userIndexInArray = post.likes.indexOf(authorId);
        post.likes.splice(userIndexInArray, 1);
        likes = [...post.likes];
      }

      const updatedPost = await db.Post.findByIdAndUpdate(
        postId,
        { likes: likes },
        { new: true },
      ).exec();

      return response
        .status(200)
        .json({ status: true, msg: 'Post likes updated', data: { post: updatedPost } });
    } catch (error) {
      config.logger.error(error);
      return response.status(500).json({ status: false, msg: error.message });
    }
  }

  //comment post
  async commentPost(request: MyRequest, response: Response) {
    const token = request.token;
    const username = token.username;
    const { comment } = request.body;
    const postId = request.params.id;

    try {
      const post = await db.Post.findById(postId);
      if (!post) {
        throw new Error('Post not found');
      }

      let comments = [];
      const newComment = {
        username: username,
        comment: comment,
        likes: 0,
        replies: [],
      };

      if (!post.comments) {
        comments = [newComment];
      } else {
        comments = [...post.comments, newComment];
      }

      const updatedPost = await db.Post.findByIdAndUpdate(
        postId,
        { comments: comments },
        { new: true },
      ).exec();
        //https://mongoosejs.com/docs/populate.html
      //https://stackoverflow.com/questions/38820071/create-object-parent-which-nested-children-in-mongoose
      return response
        .status(200)
        .json({ status: true, msg: 'Post comments updated', data: { post: updatedPost } });
    } catch (error) {
      config.logger.error(error);
      return response.status(500).json({ status: false, msg: error.message });
    }
  }
}
