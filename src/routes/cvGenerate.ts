import { Router } from 'express';
import pdf from 'dynamic-html-pdf';
import fs from 'fs';
import path from 'path';

const routes = Router();

routes.get('/', (request, response) => {
  const html = fs.readFileSync(path.resolve('src', 'templates', 'cv.html'), {
    encoding: 'utf-8',
  });

  // Custom handlebar helper
  pdf.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
  };

  const user = {
    name: 'Kauê',
  };

  const document = {
    type: 'buffer', // 'file' or 'buffer'
    template: html,
    context: {
      avatar: path.resolve('src', 'uploads', 'avatar.jpg'),
      user,
    },
    path: './output.pdf', // it is not required if type is buffer
  };

  pdf
    .create(document, options)
    .then(res => {
      console.log(res);
      fs.writeFileSync(path.resolve('src', 'tmp', 'teste.pdf'), res, {
        encoding: 'utf-8',
      });
    })
    .catch(error => {
      console.error(error);
    });

  response.json({ message: 'generate cv!' });
});
routes.post('/', (request, response) => {
  const { cv } = request.body;
  response.json({ cv });
});

export default routes;
