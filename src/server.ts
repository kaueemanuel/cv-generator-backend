import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import path from 'path';
const cors = require('cors');
import Mongoose from './connections/mongodb';
dotenv.config({
  path: path.resolve('src', 'env', '.env'),
});

Mongoose._init();

const app = express();
const corsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200, //some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
