import { FastifyRequest, FastifyReply } from 'fastify';
import { CartService } from '../services/CartService';

class CartController {
  async adicionarItem(req: FastifyRequest, res: FastifyReply) {
    const { produtoId, quantidade } = req.body as { produtoId: number, quantidade: number };
    const usuarioId = req.user.id as number;
    
    const carrinhoService = new CartService();

    try {
      const carrinho = await carrinhoService.adicionarItemAoCarrinho(usuarioId, produtoId, quantidade);
      res.status(200).send({ message: 'Item adicionado ao carrinho com sucesso!', carrinho });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao adicionar item ao carrinho' });
    }
  }

  async verCarrinho(req: FastifyRequest, res: FastifyReply) {
    const usuarioId = req.user.id as number;
    
    const carrinhoService = new CartService();

    try {
      const carrinho = await carrinhoService.obterCarrinhoPorUsuarioId(usuarioId);
      res.status(200).send(carrinho);
    } catch (err) {
      res.status(500).send({ error: 'Erro ao buscar carrinho' });
    }
  }

  async removerItem(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.body as { id: number };
    
    const carrinhoService = new CartService();

    try {
      await carrinhoService.removerItemDoCarrinho(id);
      res.status(200).send({ message: 'Item removido do carrinho com sucesso!' });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao remover item do carrinho' });
    }
  }
}

export { CartController };
