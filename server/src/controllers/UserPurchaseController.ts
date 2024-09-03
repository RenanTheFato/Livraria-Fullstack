// import { FastifyReply, FastifyRequest } from 'fastify';
// import { UserPurchaseService } from '../services/UserPurchaseService';

// class UserPurchaseController {
//   async handle(req: FastifyRequest, res: FastifyReply) {
//     console.log('UserPurchaseController.handle called');
    
//     const { id_livro, quantidade } = req.body as { id_livro: number; quantidade: number };
//     const userPurchaseService = new UserPurchaseService();
    
//     const id_user = req.user?.id;  
    
//     if (typeof id_user !== 'number') {
//       console.log('Invalid user id');
//       return res.status(401).send({ message: 'Usuário não autenticado.' });
//     }

//     try {
//       console.log('Calling UserPurchaseService.execute');
//       const result = await userPurchaseService.execute(id_user, id_livro, quantidade);
//       console.log(result);
//       return res.status(200).send(result);
//     } catch (error: any) {
//       console.error('Error during purchase:', error);
//       return res.status(500).send({ message: error.message });
//     }
//   }
// }

// export { UserPurchaseController }
