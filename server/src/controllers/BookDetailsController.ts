import { FastifyRequest, FastifyReply } from "fastify";
import { BookDetailsService } from "../services/BookDetailsService";

class BookDetailsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: number };
    const bookDetailsService = new BookDetailsService();

    try {
      const book = await bookDetailsService.execute((id));
      if (!book) {
        return res.status(404).send({ message: 'Livro não encontrado' });
      }
      res.send(book);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Erro interno do servidor' });
    }
  }
}

export { BookDetailsController };
