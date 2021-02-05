import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log(`Server started http://localhost:${port}`);
});
