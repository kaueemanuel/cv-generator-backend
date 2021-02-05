import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
  response.json({ message: 'generate cv!' });
});
routes.post('/', (request, response) => {
  const { cv } = request.body;
  response.json({ cv });
});

export default routes;
