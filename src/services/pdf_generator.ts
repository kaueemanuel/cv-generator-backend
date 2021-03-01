import puppeteer from 'puppeteer';
import ejs from 'ejs';
import path from 'path';
import fs from 'fs';
const pdf = require('dynamic-html-pdf');

export interface IPessoalData {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin?: string;
  avatar?: string;
}

export interface ICVData {
  pessoalData: IPessoalData;
}

export interface IRenderData {
  data: ICVData;
  cvName: string;
}
export interface IClusterData {
  page: puppeteer.Page;
  data: IRenderData;
}

class PDFGenerator {
  constructor() {}

  async main(Values: IRenderData) {
    try {
      return await this.render(Values);
    } catch (error) {
      console.log(error);
    }
  }

  async render(Values: IRenderData) {
    try {
      const cvName = Values.cvName.trim();
      const data = Values.data;
      const html = await ejs.renderFile(
        path.resolve('src', 'templates', `${cvName}.ejs`),
        data,
        { async: true },
      );
      let options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm',
      };
      let document = {
        type: 'buffer', // 'file' or 'buffer'
        template: html,
        context: {},
      };
      const buffer: Buffer = await pdf.create(document, options);
      return buffer.toString('base64');
    } catch (error) {
      throw {};
    }
  }
}

export default PDFGenerator;
