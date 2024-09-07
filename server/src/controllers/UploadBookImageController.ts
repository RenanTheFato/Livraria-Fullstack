import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { databaseConnect } from '../database/connection';

const pump = promisify(pipeline);

class UploadBookImageController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id_livro } = req.params as { id_livro: string };

    const file = await req.file();
    if (!file || !file.file) {
      return res.status(400).send({ error: 'Imagem não fornecida' });
    }

    const [book] = await databaseConnect.query(`SELECT * FROM ${process.env.TABLE1} WHERE id = ?`, [id_livro]);

    if (!book) {
      return res.status(404).send({ error: 'Livro não encontrado' });
    }

    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const fileName = `${Date.now()}-${file.filename}`;
    const filePath = path.join(uploadDir, fileName);

    const writeStream = fs.createWriteStream(filePath);
    await pump(file.file, writeStream);

    await databaseConnect.query(`UPDATE ${process.env.TABLE1} SET imagem = ? WHERE id = ?`, [fileName, id_livro]);

    return res.status(200).send({ message: 'Imagem enviada com sucesso!', imageUrl: `/uploads/${fileName}` });
  }
}

export { UploadBookImageController };
