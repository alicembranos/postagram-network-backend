import * as dotenv from 'dotenv';
import log from 'loglevel';

dotenv.config();

const ENV = process.env.NODE_ENV || 'development';

log.enableAll();

const CONFIG = {
    production: {
        app: {
            PORT: process.env.PORT || 4000
        },
        logger: {
            warn: log.warn,
            info: log.info,
            error: log.error,
            trace: log.trace,
            debug: log.debug
        },
        db: {
            url:process.env.DB_URL
        }
    },
    development: {
        app: {
            PORT: process.env.PORT || 4000
        },
        logger: {
            warn: log.warn,
            info: log.info,
            error: log.error,
            trace: log.trace,
            debug: log.debug
        },
        db: {
            url:process.env.DB_URL
        }
    },
    test: {
        app: {
            PORT: process.env.PORT || 4000
        },
        logger: {
            warn: log.warn,
            info: log.info,
            error: log.error,
            trace: log.trace,
            debug: log.debug
        },
        db: {
            url:process.env.DB_URL
        }
    }
}

export default CONFIG[ENV];