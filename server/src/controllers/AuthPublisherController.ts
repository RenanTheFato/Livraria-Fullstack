import { FastifyRequest, FastifyReply  } from 'fastify'
import { AuthPublisherService } from '../services/AuthPublisherService'

class AuthPublisherController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const {CNPJ, email, senha} = req.body as {CNPJ:number , email: string, senha: string};

    const authPublisherService = new AuthPublisherService();

    try {
      const publisher = await authPublisherService.execute({CNPJ, email, senha});
      res.status(200).send({publisher})
    } catch (error) {
      res.status(401).send({error: 'Credenciais Não Autorizadas.'});
      throw error;
    }
  }
}

export { AuthPublisherController }