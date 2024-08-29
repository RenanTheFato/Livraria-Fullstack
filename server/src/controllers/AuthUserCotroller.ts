import { FastifyRequest, FastifyReply  } from 'fastify'
import { AuthUserService } from '../services/AuthUserService'

class AuthUserController{
  async handle(req: FastifyRequest, res: FastifyReply){

    const {email, senha} = req.body as {email: string, senha: string};

    const authUserService = new AuthUserService();

    try {
      const user = await authUserService.execute({email, senha});
      res.status(200)
    } catch (error) {
      res.status(400);
      throw error;
    }
  }
}

export { AuthUserController }