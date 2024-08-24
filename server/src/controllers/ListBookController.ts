import { FastifyRequest, FastifyReply } from "fastify";
import { ListBookService } from "../services/ListBookService";

class ListBookController{

  async handle(req: FastifyRequest, res: FastifyReply) {
    const listBookService = new ListBookService();

    const books = await listBookService.execute()

    res.send(books)
  }
}

export { ListBookController }