import { databaseConnect } from "../database/connection";
import 'dotenv'

export type BookCategory = 'Ação' | 'Aventura' | 'Fantasia' | 'Ficção'  |'Suspense' | 'Drama' | 'Terror' | 'Infantil' | 'Gibi' | 
  'Biografia' | 'Mistério' | 'Esportivo';

interface CreateBookProps{
  titulo: string,
  descricao: string,
  autor: string,
  categoria: BookCategory
  classificacao: string,
  paginas: number,
  editora: string,
  ano_pub: number,
  preco: number
}

class CreateBookService{
  async execute({titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub, preco}: CreateBookProps){
    console.log('Rota de Criação Executada!');

    try {
    const [result] = await databaseConnect.query(`INSERT INTO ${process.env.TABLE1} (titulo, descricao, autor, categoria, classificacao, paginas, editora, ano_pub, preco) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, [titulo, descricao, autor, categoria ,classificacao, paginas, editora, ano_pub, preco] );

      const referenceId = (result as any).insertId;

      console.log(result)

      return{ id: referenceId, titulo, descricao, autor, classificacao, paginas, editora, ano_pub }
      
    } catch (error) {

      console.error(error);
      throw error;

    }

  }
}

export { CreateBookService }