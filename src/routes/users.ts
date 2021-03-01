import { Router } from 'express';
import Users from '../classes/users';
const routes = Router();

routes.get('/', async (request, response) => {
  const result = await Users.get(request.params);
  response.json({ data: result });
});
routes.post('/', async (request, response) => {
  try {
    const user = await Users.create(request.body);
    response.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    response.status(400).json({ msg: 'Erro ao criar usuario' });
  }
});

export default routes;
