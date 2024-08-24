import { FastifyRequest, FastifyReply } from 'fastify'
import { BookCategory, CreateBookService } from '../services/CreateBookService';

class CreateBookController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const { titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub } = req.body as {titulo: string, descricao: string, autor: string,  categoria: BookCategory ,classificacao: string, paginas :number, editora: string, ano_pub: number};
    const createBookService = new CreateBookService();
    
    const createBook = await createBookService.execute({titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub})
  }
}

export { CreateBookController }