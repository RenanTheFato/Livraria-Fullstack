import { FastifyRequest, FastifyReply } from 'fastify'
import 'dotenv'

class LoginPublisherController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    if (req.publisher) {
      return res.send(req.publisher);
    } else {
      return res.status(401).send({ error: 'Não Autorizado!' });
    }
  }
}

export { LoginPublisherController }