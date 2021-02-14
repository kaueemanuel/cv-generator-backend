import { Router } from 'express';
import PDFGeneratorClass, { IRenderData } from '../services/pdf-generator';
import { v1 } from 'uuid';
import fs from 'fs';
import UtilClass from '../helpers/util';
const { sleep } = new UtilClass();
const routes = Router();
import path from 'path';
import multer from 'multer';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending extension
  },
});
const upload = multer({
  storage: storage,
});

routes.get('/', async (request, response) => {
  response.json({ message: 'generate cv!' });
});
routes.post('/', upload.single('avatar'), async (request, response) => {
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
