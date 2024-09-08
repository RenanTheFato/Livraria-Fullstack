import { FastifyRequest, FastifyReply } from 'fastify'
import { BookCategory, CreateBookService } from '../services/CreateBookService';
import { z } from 'zod'

class CreateBookController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const bookCategories = ['Ação' , 'Aventura', 'Fantasia', 'Ficção' ,'Suspense', 'Drama', 'Terror', 'Infantil', 'Gibi', 'Biografia', 'Mistério', 'Esportivo'] as const;

    const { titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub, preco } = req.body as {titulo: string, descricao: string, autor: string,  categoria: BookCategory ,classificacao: string, paginas :number, editora: string, ano_pub: number, preco: number};
    const currentYear = new Date().getFullYear();
    const createBookService = new CreateBookService();

    const bookValidation = z.object({
      titulo: z.string().min(2),
      descricao: z.string().min(1),
      autor: z.string().min(1),
      categoria: z.enum(bookCategories),
      classificacao: z.string().min(1),
      paginas: z.number().nonnegative().min(1),
      editora: z.string().min(1),
      ano_pub: z.number().int().max(currentYear),
      preco: z.number().nonnegative().min(1)
    })

    try {
      bookValidation.parse(req.body);
    } catch (err: any) {
      return res.status(400).send({ error: err.errors });
    }
    
    const createBook = await createBookService.execute({titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub, preco})
    return res.status(200).send(createBook);
  }
}

export { CreateBookController }