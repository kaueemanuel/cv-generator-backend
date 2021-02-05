import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const originAux = ['*'];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (
      !origin ||
      originAux.indexOf('*') !== -1 ||
      originAux.indexOf(origin) !== -1
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
