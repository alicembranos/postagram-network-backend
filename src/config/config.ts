import * as dotenv from 'dotenv';
import log from 'loglevel';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

log.enableAll();

const CONFIG = {
  production: {
    app: {
      PORT: process.env.PORT || 4000,
      PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    },
    logger: {
      warn: log.warn,
      info: log.info,
      error: log.error,
      trace: log.trace,
      debug: log.debug,
    },
    db: {
      url: process.env.DB_URL,
    },
    cloudinary: {
      name: process.env.CLOUD_NAME,
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
    },
  },
  development: {
    app: {
      PORT: process.env.PORT || 4000,
      PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    },
    logger: {
      warn: log.warn,
      info: log.info,
      error: log.error,
      trace: log.trace,
      debug: log.debug,
    },
    cloudinary: {
      name: process.env.CLOUD_NAME,
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
    },
    db: {
      url: process.env.DB_URL,
    },
  },
  test: {
    app: {
      PORT: process.env.PORT || 4000,
      PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
    },
    logger: {
      warn: log.warn,
      info: log.info,
      error: log.error,
      trace: log.trace,
      debug: log.debug,
    },
    db: {
      url: process.env.DB_URL,
    },
    cloudinary: {
      name: process.env.CLOUD_NAME,
      apiKey: process.env.API_KEY,
      apiSecret: process.env.API_SECRET,
    },
  },
};

export default CONFIG[ENV];
