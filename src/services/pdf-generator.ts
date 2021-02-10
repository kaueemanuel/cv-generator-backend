import { Cluster } from 'puppeteer-cluster';
import puppeteer from 'puppeteer';
import ejs, { render } from 'ejs';
import path from 'path';
import fs from 'fs';

export interface IPessoalData {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin?: string;
}

export interface ICVData {
  pessoalData: IPessoalData;
}

export interface IRenderData {
  values: ICVData;
  cvName: string;
}
export interface IClusterData {
  page: puppeteer.Page;
  data: IRenderData;
}

process.on('message', async (data: IRenderData) => {
  const PDFGen = new PDFGenerator();
  await PDFGen.main(data.values, data.cvName);
  process.exit();
});

class PDFGenerator {
  constructor() {}

  async main(cvData: ICVData, cvName: string) {
    try {
      const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 10,
      });

      await cluster.task(async ({ page, data }) => {
        const Values: IClusterData = {
          page: page,
          data: data,
        };
        await this.render(Values);
      });
      const renderData: IRenderData = { values: cvData, cvName };
      await cluster.queue(renderData);
      await cluster.idle();
      await cluster.close();
    } catch (error) {
      console.log(error);
    }
  }

  async render(Values: IClusterData) {
    try {
      const cvName = Values.data.cvName.trim();
      const values = Values.data.values;
      const page = Values.page;

      const html = await ejs.renderFile(
        path.resolve('src', 'templates', `${cvName.split('-')[0]}.ejs`),
        values,
        { async: true },
      );
      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });
      const margin = '11mm';
      const buffer: Buffer = await page.pdf({
        format: 'a4',
        margin: {
          bottom: margin,
          left: margin,
          right: margin,
          top: margin,
        },
        printBackground: true,
      });
      fs.writeFileSync(path.resolve('src', 'tmp', cvName), buffer, {
        encoding: 'utf-8',
      });
      return buffer;
    } catch (error) {
      console.log(error);
    }
  }
}

export default PDFGenerator;
