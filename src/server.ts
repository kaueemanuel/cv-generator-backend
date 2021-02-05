import express from 'express';
import routes from './routes';
import * as cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({
  path: './env/.env',
});
const app = express();
const corsOptions: cors.CorsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200, //some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
