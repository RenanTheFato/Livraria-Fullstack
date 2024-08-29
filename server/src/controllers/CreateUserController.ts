import { FastifyRequest, FastifyReply  } from 'fastify'
import { CreateUserService } from '../services/CreateUserService'
import { databaseConnect } from '../database/connection';
import bcrypt from 'bcryptjs'
import { z } from 'zod'

class CreateUserController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const {nome, email, senha} = req.body as {nome: string, email: string, senha: string};

    const createUserService = new CreateUserService();

    const userValidation = z.object({
      nome: z.string().min(3),
      email: z.string().email({ message: "Email Inválido!"}).min(5),
      senha: z.string()
    })

    const verifyUser = userValidation.parse(req.body);

    const [emailFind] = await databaseConnect.query('SELECT COUNT(*) AS count FROM usuarios WHERE email = ?', [email]);
    const countEmail = (emailFind as any)[0].count;
    
    if (countEmail > 0) {
      throw new Error('Email já está cadastrado');
    }

    const hashPass = await bcrypt.hash(senha, 10);

    const createUser = await createUserService.execute({nome, email, senha: hashPass});

  }
}

export { CreateUserController }