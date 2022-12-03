import mongoose from 'mongoose';
import { app } from './app';
import { DatabaseConnectionError } from '@pippip/pip-system-common';

const start = async () => {
  console.log('\nStarting up ...\n');
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET must be defined.');
  }
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('REFRESH_TOKEN_SECRET must be defined.');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined.');
  }
  if (!process.env.PORT) {
    throw new Error('PORT must be defined.');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('=========== Connected to MongoDB ===========');
  } catch (err) {
    console.log(err); 
    throw new DatabaseConnectionError();
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT} !!!\n`);
  });
};

start();
