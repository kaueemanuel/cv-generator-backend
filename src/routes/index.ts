import { Router } from 'express';
import cvGenerator from './cvGenerate';

const routes = Router();

routes.get('/api', (request, response) => {
  response.json({ message: 'Hello World!' });
});
routes.post('/api', (request, response) => {
  const { name } = request.body;
  response.json({ name });
});

routes.use('/api/cv', cvGenerator);

export default routes;
