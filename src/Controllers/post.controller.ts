import { Request, Response, NextFunction } from 'express';
import { MyRequest } from '@/interfaces/Request.interface';
import formidable, { Fields, File, Files } from 'formidable';
import config from '@/Config/config';
import { fileUpload } from '../Services/cloudinary/config';
import db from '../Model';

interface Post {
  create(request: MyRequest, response: Response, next: NextFunction): void;
  // Promise<Response<any, Record<string, any>>>
  getPosts(_, response: Response): void;
}

export class PostController implements Post {
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
        const id = token._id;
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
          author: id,
        });
        console.log('newPost', newPost);

        return response
          .status(201)
          .json({ status: true, msg: 'Post created succesfully', data: { post: newPost } });
      } catch (error) {
        config.logger.error(error);
        return response.status(500).json({ status: false, msg: error.message });
      }
    });
  }

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
}
