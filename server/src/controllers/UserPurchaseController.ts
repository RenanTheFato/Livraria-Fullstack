import { FastifyRequest, FastifyReply } from 'fastify';
import { UserCartService } from '../services/UserCartService';
import { UserPurchaseService } from '../services/UserPurchaseService';

class UserPurchaseController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    if (!req.user || typeof req.user.id !== 'number') {
      return res.status(401).send({ error: 'Não Autorizado!' });
    }
    const id_usuario = req.user.id;

    const cartService = new UserCartService();
    const cartItems = await cartService.getCartItems(id_usuario);

    if (cartItems.length === 0) {
      return res.status(400).send({ error: 'O carrinho está vazio' });
    }

    const checkoutService = new UserPurchaseService();

    try {
      await checkoutService.execute(cartItems, id_usuario);
      await cartService.clearCart(id_usuario);
      return res.status(200).send({ message: 'Compra realizada com sucesso' });
    } catch (error) {
      return res.status(500).send({ error: 'Erro ao processar a compra' });
    }
  }
}

export { UserPurchaseController };
