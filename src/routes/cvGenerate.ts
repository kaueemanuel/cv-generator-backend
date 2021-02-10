import { Router, Response } from 'express';
import PDFGeneratorClass, { IRenderData } from '../services/pdf-generator';
import { fork } from 'child_process';
import path from 'path';
import { v1 } from 'uuid';
import fs from 'fs';
import UtilClass from '../helpers/util';
const { sleep } = new UtilClass();
const routes = Router();

const checkCreateCv = async (cvName: string, response: Response) => {
  try {
    const pathCv = path.resolve('src', 'tmp', cvName);
    const data = fs.readFileSync(pathCv);
    fs.unlinkSync(pathCv);
    return response.send(data);
  } catch (error) {
    await sleep(100);
    checkCreateCv(cvName, response);
  }
};

routes.get('/', async (request, response) => {
  response.json({ message: 'generate cv!' });
});
routes.post('/', async (request, response) => {
  const data: IRenderData = request.body;
  const childProcess = fork(
    path.resolve('src', 'services', 'pdf-generator.ts'),
  );
  data.cvName = data.cvName + '-' + v1() + '.pdf';
  response.setHeader('Content-type', 'application/octet-stream');
  response.setHeader(
    'Content-Disposition',
    'attachment; filename=' + data.cvName,
  );
  childProcess.send(data);

  return checkCreateCv(data.cvName, response);
  // const finaly = true;
  // while (finaly) {}

  // await PDFGenerator.main(data, 'cv');
});

export default routes;
