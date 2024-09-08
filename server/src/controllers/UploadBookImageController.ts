import { FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { databaseConnect } from '../database/connection';
import { CreateBookService } from '../services/CreateBookService';

const pump = promisify(pipeline);

class UploadBookImageController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id_livro } = req.params as { id_livro: string };

    // Recebe o arquivo de imagem enviado
    const file = await req.file();
    if (!file || !file.file) {
      return res.status(400).send({ error: 'Imagem não fornecida' });
    }

    const createBookService = new CreateBookService();

    try {
      // Verifica se o livro existe no banco de dados
      const [book] = await databaseConnect.execute(
        `SELECT * FROM ${process.env.TABLE1} WHERE id = ?`,
        [id_livro]
      );

      if (!book) {
        return res.status(404).send({ error: 'Livro não encontrado' });
      }

      // Diretório de upload de imagens
      const uploadDir = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      // Nome do arquivo de imagem
      const fileName = `${Date.now()}-${file.filename}`;
      const filePath = path.join(uploadDir, fileName);

      // Cria o stream de escrita para salvar o arquivo no sistema de arquivos
      const writeStream = fs.createWriteStream(filePath);
      await pump(file.file, writeStream);

      // Atualiza a coluna de imagem no banco de dados
      await databaseConnect.execute(
        `UPDATE ${process.env.TABLE1} SET imagem = ? WHERE id = ?`,
        [fileName, id_livro]
      );

      return res.status(200).send({ message: 'Imagem enviada com sucesso!', imageUrl: `/uploads/${fileName}` });
      
    } catch (error) {
      await createBookService.deleteById(parseInt(id_livro));
      return res.status(500).send({ error: 'Imagem Obrigatória Para Livro. Livro removido.' });
    }
  }
}

export { UploadBookImageController };
