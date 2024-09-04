import { databaseConnect } from "../database/connection";
import 'dotenv'

interface CreatePublisherProps{
  CNPJ: number;
  nome: string,
  email: string,
  senha: string
}
class CreatePublisherService{

  async execute({ CNPJ, nome, email, senha}: CreatePublisherProps){
    console.log("Rota de Criação de Editora executada!");

    try {
      const [result] = await databaseConnect.query(`INSERT INTO ${process.env.TABLE5} (CNPJ, nome, email, senha) VALUES (?, ?, ?, ?);`, [CNPJ, nome, email, senha] );

      console.log(result)
      return{ CNPJ, nome, email};

    } catch (err: any) {

      console.error(err);
      throw err;

    }
    
  }
}

export { CreatePublisherService }