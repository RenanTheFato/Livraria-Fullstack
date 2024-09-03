// import { FastifyRequest, FastifyReply } from 'fastify';
// import { UserPurchaseService } from '../services/UserPurchaseService';

// class UserPurchaseController {
//   async handle(req: FastifyRequest, res: FastifyReply) {
//     if (!req.user || typeof req.user.id !== 'number') {
//       return res.status(401).send({ error: 'Não Autorizado!' });
//     }

//     const id_usuario = req.user.id;
//     const purchaseService = new UserPurchaseService();

//     try {
//       const result = await purchaseService.execute(id_usuario);
//       console.log(result)
//       return res.status(200).send(result);
//     } catch (error) {
//       return res.status(500).send({ error: 'Erro ao processar a compra' });
//     }
//   }
//   async handlePurchases(req: FastifyRequest, res: FastifyReply){
//     if (!req.user || typeof req.user.id !== 'number') {
//       return res.status(401).send({ error: 'Não Autorizado!' });
//     }
  
//     const id_usuario = req.user.id;
//     const purchaseService = new UserPurchaseService();
  
//     try {
//       const purchases = await purchaseService.getUserPurchases(id_usuario);
//       console.log(purchases)
//       return res.status(200).send(purchases);
//     } catch (error) {
//       return res.status(500).send({ error: 'Erro ao obter compras' });
//     }
//   }
// }

// export { UserPurchaseController };
