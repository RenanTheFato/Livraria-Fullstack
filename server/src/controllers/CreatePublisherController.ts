import { FastifyRequest, FastifyReply  } from 'fastify'
import { CreatePublisherService } from '../services/CreatePublisherService'
import { databaseConnect } from '../database/connection';
import bcrypt from 'bcryptjs'
import { z } from 'zod'

class CreatePublisherController {
  async handle(req: FastifyRequest, res: FastifyReply){
    const {CNPJ, nome, email, senha} = req.body as {CNPJ: string, nome: string, email: string, senha: string};

    const createPublisherService = new CreatePublisherService();

    const publisherValidation = z.object({
      CNPJ: z.string().min(6, {message: "CNPJ não atende ao mínimo de caracters"}),
      nome: z.string().min(3, {message: "Nome não atende ao mínimo de caracters"}),
      email: z.string().email({ message: "Email Inválido!"}).min(5, {message: "Email não atende ao mínimo de caracters"}),
      senha: z.string().min(6, {message: "Senha não atende ao mínimo de caracters"})
    })

    try {
      publisherValidation.parse(req.body);
    } catch (err: any) {
      return res.status(400).send({ error: err.errors });
    }

    const [cnpjFind] = await databaseConnect.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE5} WHERE CNPJ = ?`, [CNPJ]);
    const countCnpj = (cnpjFind as any)[0].count;
    
    if (countCnpj > 0) {
      return res.status(401).send({ error: 'CNPJ já está cadastradoizado!' });;
    }

    const [emailFind] = await databaseConnect.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE5} WHERE email = ?`, [email]);
    const countEmail = (emailFind as any)[0].count;
    
    if (countEmail > 0) {
      return res.status(401).send({ error: 'Email já está cadastradoizado!' });;
    }

    const hashPass = await bcrypt.hash(senha, 10);

     try {
      await createPublisherService.execute({ CNPJ, nome, email, senha: hashPass });
      res.status(200).send({ message: 'Editora criada com sucesso!' });
    } catch (err) {
      res.status(500).send({ error: 'Erro ao criar editora. Tente novamente.' });
    }

  }
}

export { CreatePublisherController }