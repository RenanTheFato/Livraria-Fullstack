import { databaseConnect } from "../database/connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv'

interface AuthPublisherProps{
  CNPJ: number,
  email: string,
  senha: string
}

class AuthPublisherService{
  async execute({ CNPJ, senha}: AuthPublisherProps){
    const [verifyCnpj] = await databaseConnect.query(`SELECT * FROM ${process.env.TABLE5} WHERE CNPJ = ?`, [CNPJ]);
    const verifyPublisher = (verifyCnpj as any)[0];

    if(!verifyPublisher){
      throw new Error("Email ou senha inválidos!");
    }

    const verifyPass = await bcrypt.compare(senha, verifyPublisher.senha);

    if (!verifyPass) {
      throw new Error("Email ou senha inválidos!");
    }

    const token = jwt.sign({ id: verifyPublisher.id }, process.env.JWTPASS ?? '', { expiresIn: '3d' });

    const {senha: _, ...publisherLogin} = verifyPublisher
    
    console.log({publisherLogin: publisherLogin, token: token});
    return { publisher: publisherLogin, token: token };
  }
}

export { AuthPublisherService }