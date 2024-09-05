import { databaseConnect } from "../database/connection";
import { RowDataPacket } from 'mysql2';
import 'dotenv';

interface Book {
  id: number;
  titulo: string;
  descricao: string;
  autor: string;
  editora: string;
  categoria: string;
  classificacao: string;
  paginas: number;
  ano_pub: number;
  preco: number;
}

class BookDetailsService {
  async execute(id: number): Promise<Book | null> {
    try {
      const [rows] = await databaseConnect.query<RowDataPacket[]>(
        'SELECT * FROM livros WHERE id = ?',
        [id]
      );

      return rows.length > 0 ? (rows[0] as Book) : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export { BookDetailsService };
