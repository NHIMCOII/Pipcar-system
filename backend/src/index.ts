import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting up ...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined.');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined.');
  }
  if (!process.env.PORT) {
    throw new Error('PORT must be defined.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(process.env.PORT, () => {
    console.log(`PipCar is running at port ${process.env.PORT} !!!`);
  });
};

start();
