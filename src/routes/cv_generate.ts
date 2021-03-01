import { Router } from 'express';
import PDFGeneratorClass, { IRenderData } from '../services/pdf_generator';
import { v1 } from 'uuid';
import fs from 'fs';
import UtilClass from '../helpers/util';
const { sleep } = new UtilClass();
const routes = Router();
import path from 'path';
import multer from 'multer';

routes.get('/', async (request, response) => {
  response.json({ message: 'generate cv!' });
});
routes.post('/', async (request, response) => {
  try {
    const dataToGenerate = request.body;

    const PDFGenerator = new PDFGeneratorClass();
    const buffer = await PDFGenerator.main(dataToGenerate);
    response.send(buffer);
  } catch {
    response.status(400).json({ msg: 'Erro ao gerar o currículo' });
  }
});

export default routes;
