import { databaseConnect } from "../database/connection";
import 'dotenv'

interface CreateUserProps{
  nome: string,
  email: string,
  senha: string
}

class CreateUserService{
  async execute({ nome, email, senha}: CreateUserProps){
    console.log("Rota de Criação de Usuário executada!");

    
  }
}

export { CreateUserService }