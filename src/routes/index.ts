import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ message: 'Hello World!' });
});
routes.post('/', (request, response) => {
  const { name } = request.body;
  response.json({ name });
});

export default routes;
