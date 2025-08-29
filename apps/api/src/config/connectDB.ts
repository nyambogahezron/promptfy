import mongoose from 'mongoose';

export default async function connectDB(url: string): Promise<typeof mongoose> {
  return mongoose.connect(url);
}
