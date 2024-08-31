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
      nome: z.string().min(3, {message: "Nome não atende ao mínimo de caracters"}),
      email: z.string().email({ message: "Email Inválido!"}).min(5, {message: "Email não atende ao mínimo de caracters"}),
      senha: z.string().min(6, {message: "Senha não atende ao mínimo de caracters"})
    })

    try {
      userValidation.parse(req.body);
    } catch (err: any) {
      return res.status(400).send({ error: err.errors });
    }

    const [emailFind] = await databaseConnect.query('SELECT COUNT(*) AS count FROM usuarios WHERE email = ?', [email]);
    const countEmail = (emailFind as any)[0].count;
    
    if (countEmail > 0) {
      return res.status(401).send({ error: 'Email já está cadastradoizado!' });;
      
    }

    const hashPass = await bcrypt.hash(senha, 10);

     try {
      await createUserService.execute({ nome, email, senha: hashPass });
      res.status(200).send({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao criar usuário. Tente novamente.' });
    }

  }
}

export { CreateUserController }