import { createRequire } from 'module';
import config from '../../Config/config';
import cloudinary from 'cloudinary';
import { resolve } from 'path';

const Cloudinary = cloudinary.v2;

Cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

export const fileUpload = async (file: string) => {
  return new Promise(resolve => {
    Cloudinary.uploader.upload(file, { folder: 'postgram' }, (error, res) => {
      if (error) {
        // return res.status(500).json({ msg: 'Failed to upload file' });
        return "error";
      }
      resolve(res.secure_url); //will return a secure url of the cloud file path
    });
  });
};

