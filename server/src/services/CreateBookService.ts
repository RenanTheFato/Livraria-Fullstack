import { databaseConnect } from "../database/connection";
import 'dotenv'

export type BookCategory = 'acao'|'aventura'|'fantasia'|'ficcao'|'suspense'|'drama'|'terror'
|'infantil'|'gibi'|'biografia'|'historia'|'misterio';

interface CreateBookProps{
  titulo: string,
  descricao: string,
  autor: string,
  categoria: BookCategory
  classificacao: string,
  paginas: number,
  editora: string,
  ano_pub: number
}

class CreateBookService{
  async execute({titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub}: CreateBookProps){
    console.log('Rota de Criação Executada!');

    try {
    const [result] = await databaseConnect.query(`INSERT INTO ${process.env.TABLE1} (titulo, descricao, autor, categoria,classificacao, paginas, editora, ano_pub) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`, [titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub] );

      const referenceId = (result as any).referenceId;

      console.log(result)

      return{ id: referenceId, titulo, descricao, autor, classificacao, paginas, editora, ano_pub }
      
    } catch (error) {

      console.error(error);
      throw error;

    }

  }
}

export { CreateBookService }