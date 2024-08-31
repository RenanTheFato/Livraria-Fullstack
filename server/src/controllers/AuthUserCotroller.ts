import { FastifyRequest, FastifyReply  } from 'fastify'
import { AuthUserService } from '../services/AuthUserService'

class AuthUserController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const {email, senha} = req.body as {email: string, senha: string};

    const authUserService = new AuthUserService();

    try {
      const user = await authUserService.execute({email, senha});
      res.status(200).send({user})
    } catch (error) {
      res.status(401).send({error: 'Credenciais Não Autorizadas.'});
      throw error;
    }
  }
}

export { AuthUserController }