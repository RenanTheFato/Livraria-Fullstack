// import { FastifyRequest, FastifyReply } from 'fastify';
// import { UserCartService } from '../services/UserCartService';
// import { z } from 'zod';

// class UserCartController {
//   async addToCart(req: FastifyRequest, res: FastifyReply) {
//     const { id_livro, quantidade } = req.body as { id_livro: number; quantidade: number };

//     const userCartService = new UserCartService();

//     if (!req.user || typeof req.user.id !== 'number') {
//       return res.status(401).send({ error: 'Não Autorizado!' });
//     }
//     const id_usuario = req.user.id;

//     const cartValidation = z.object({
//       id_livro: z.number().nonnegative(),
//       quantidade: z.number().positive()
//     });

//     try {
//       cartValidation.parse({ id_livro, quantidade });
//     } catch (err: any) {
//       return res.status(400).send({ error: err.errors });
//     }

//     try {
//       await userCartService.addItem({ id_usuario, id_livro, quantidade });
//       return res.status(200).send({ message: 'Item adicionado ao carrinho com sucesso' });
//     } catch (err) {
//       return res.status(500).send({ error: 'Erro ao adicionar item ao carrinho', err });
//     }
//   }

//   async removeFromCart(req: FastifyRequest, res: FastifyReply) {
//     const { id_livro } = req.body as { id_livro: number };
//     const userCartService = new UserCartService();

//     if (!req.user || typeof req.user.id !== 'number') {
//       return res.status(401).send({ error: 'Não Autorizado!' });
//     }
//     const id_usuario = req.user.id;

//     try {
//       await userCartService.removeItem(id_usuario, id_livro);
//       return res.status(200).send({ message: 'Item removido do carrinho com sucesso' });
//     } catch (err) {
//       return res.status(500).send({ error: 'Erro ao remover item do carrinho' });
//     }
//   }

//   async getCart(req: FastifyRequest, res: FastifyReply) {
//     if (!req.user || typeof req.user.id !== 'number') {
//       return res.status(401).send({ error: 'Não Autorizado!' });
//     }

//     const userCartService = new UserCartService();
    
//     const id_usuario = req.user.id;

//     try {
//       const items = await userCartService.getCartItems(id_usuario);
//       return res.status(200).send(items);
//     } catch (err) {
//       return res.status(500).send({ error: 'Erro ao obter itens do carrinho' });
//     }
//   }
// }

// export { UserCartController };
