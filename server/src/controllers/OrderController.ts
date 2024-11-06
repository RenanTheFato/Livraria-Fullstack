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
      res.status(500).send({ error: 'Erro ao registrar pedido', err });
    }
  }

  async visualizarPedido(req: FastifyRequest, res: FastifyReply) {
    const usuarioId = req.user.id as number;

    const orderService = new OrderService();
    try {
      const pedidos = await orderService.obterPedidosPorUsuarioId(usuarioId);
      return res.status(200).send(pedidos);
    } catch (err) {
      console.error("Erro ao buscar pedidos:", err);
      return res.status(500).send({ error: "Erro ao buscar pedidos. Tente novamente mais tarde.", err });
    }
  }
}

export { OrderController };
