import { databaseConnect } from "../database/connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv'

interface AuthUserProps{
  email: string,
  senha: string
}

class AuthUserService{
  async execute({ email, senha}: AuthUserProps){
    const [verifyEmail] = await databaseConnect.query(`SELECT * FROM ${process.env.TABLE2} WHERE email = ?`, [email]);
    const verifyUser = (verifyEmail as any)[0];

    if(!verifyUser){
      throw new Error("Email ou senha inválidos!");
    }

    const verifyPass = await bcrypt.compare(senha, verifyUser.senha);

    if (!verifyPass) {
      throw new Error("Email ou senha inválidos!");
    }

    const token = jwt.sign({ id: verifyUser.id }, process.env.JWTPASS ?? '', { expiresIn: '3d' });

    const {senha: _, ...userLogin} = verifyUser
    
    console.log({userLogin: userLogin, token: token});
    return { user: userLogin, token: token };
  }
}

export { AuthUserService }