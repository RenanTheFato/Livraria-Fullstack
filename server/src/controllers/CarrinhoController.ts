import { FastifyReply, FastifyRequest } from 'fastify';
import { CarrinhoService } from '../services/CarrinhoService';

export class CarrinhoController {
     async adicionarAoCarrinho(req: FastifyRequest, reply: FastifyReply) {
        const { id_livro, quantidade } = req.body as {id_livro: number, quantidade: number};
        const { id } = req.user as {id: number};
        const result = await CarrinhoService.adicionarItem(id, id_livro, quantidade);
        reply.send(result);
    }

     async removerDoCarrinho(req: FastifyRequest, reply: FastifyReply) {
        const { id_item } = req.body as {id_item: number};
        const { id } = req.user as {id: number};
        const result = await CarrinhoService.removerItem(id, id_item);
        reply.send(result);
    }

     async visualizarCarrinho(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.user as {id: number};
        const carrinho = await CarrinhoService.obterCarrinho(id);
        reply.send(carrinho);
    }

     async finalizarCompra(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.user as {id: number};
        const result = await CarrinhoService.finalizarCompra(id);
        reply.send(result);
    }
}
