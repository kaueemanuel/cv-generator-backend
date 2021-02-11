import { Router } from 'express';
import PDFGeneratorClass, { IRenderData } from '../services/pdf-generator';
import { v1 } from 'uuid';
import fs from 'fs';
import UtilClass from '../helpers/util';
const { sleep } = new UtilClass();
const routes = Router();

routes.get('/', async (request, response) => {
  response.json({ message: 'generate cv!' });
});
routes.post('/', async (request, response) => {
  const data: IRenderData = request.body;
  const PDFGenerator = new PDFGeneratorClass();
  data.cvName = data.cvName + '-' + v1() + '.pdf';
  response.setHeader('Content-type', 'application/octet-stream');
  response.setHeader(
    'Content-Disposition',
    'attachment; filename=' + data.cvName,
  );
  const buffer = await PDFGenerator.main(data.values, data.cvName);
  response.send(buffer);
});

export default routes;
