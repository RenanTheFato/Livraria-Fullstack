import { FastifyRequest, FastifyReply } from "fastify";
import { ListBookService } from "../services/ListBookService";

interface SearchQuery {
  search: string;
}

class ListBookController{

  async handle(req: FastifyRequest, res: FastifyReply) {
    const listBookService = new ListBookService();

    const books = await listBookService.execute()

    res.send(books)
  }

  async handleSearch(req: FastifyRequest, res: FastifyReply){
    const searchQuery = req.query as unknown as SearchQuery;

    if (!searchQuery.search) {
      return res.status(400).send({ error: "Parâmetro de pesquisa é necessário" });
    }

    const listBookService = new ListBookService();
    
    try {
      const books = await listBookService.executeSearch(searchQuery.search);
      res.send(books);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erro ao buscar livros" });
    }
  }
}

export { ListBookController }