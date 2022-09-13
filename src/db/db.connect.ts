import mongoose from 'mongoose';
import config from '@/Config/config';

export default function connect(): Promise<typeof import('mongoose')> {
  return mongoose.connect(config.db.url);
}
