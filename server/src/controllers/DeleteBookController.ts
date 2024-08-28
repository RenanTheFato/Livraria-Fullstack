import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteBookService } from "../services/DeleteBookService";

class DeleteBookController{
  async handle(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.query as {id: number};

    const deleteBookService = new DeleteBookService();

    const bookDeleted = await deleteBookService.execute({ id });

    res.send(bookDeleted);
  }
}

export { DeleteBookController }