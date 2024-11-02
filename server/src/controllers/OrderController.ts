import { FastifyRequest, FastifyReply } from 'fastify';
import { OrderService } from '../services/OrderService';

class OrderController {
  async criarPedido(req: FastifyRequest, res: FastifyReply) {
    const usuarioId = req.user.id as number;
    
    const pedidoService = new OrderService();

    try {
      const pedido = await pedidoService.criarPedido(usuarioId);
      res.status(200).send({ message: 'Pedido registrado com sucesso!', pedido });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao registrar pedido' });
    }
  }
}

export { OrderController };
