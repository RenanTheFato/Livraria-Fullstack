import { FastifyRequest, FastifyReply  } from 'fastify'
import 'dotenv'

class LoginUserController{
  async handle(req: FastifyRequest, res: FastifyReply){
    return req.user;
  }
}

export { LoginUserController }