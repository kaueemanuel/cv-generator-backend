import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.resolve('src', 'env', '.env'),
});

class MongoDB {
  mongoose;
  constructor() {
    this.mongoose = mongoose;
  }
  _init() {
    const endpoint: string = process.env.MONGODB_ENDPOINT || '';

    console.log('MONGO CONNECTING...');

    this.mongoose
      .connect(endpoint, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
      })
      .then(async () => {
        console.log('MONGO CONNECT SUCCESSFUL!');
      })
      .catch(err => {
        console.log('MONGO ERROR -> ', err);
      });
  }
}
export default new MongoDB();
