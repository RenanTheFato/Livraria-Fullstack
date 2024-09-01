
import { databaseConnect } from "../database/connection";

interface CartItem {
  id_livro: number;
  quantidade: number;
}

class UserPurchaseService {
  async execute(cartItems: CartItem[], id_usuario: number) {
    const connection = await databaseConnect.getConnection();
    
    try {
      await connection.beginTransaction();

      console.log('Iniciando transação de compra');
      console.log('Itens do Carrinho:', cartItems);

      for (const item of cartItems) {
        const { id_livro, quantidade } = item;

        console.log(`Processando livro ID: ${id_livro} com quantidade: ${quantidade}`);

        const [bookRows] = await connection.query(`SELECT preco FROM ${process.env.TABLE1} WHERE id = ?`, [id_livro]);
        const book = (bookRows as any)[0];
        
        if (!book) {
          throw new Error('Livro não encontrado');
        }

        console.log(`Preço do livro ${id_livro}: ${book.preco}`);
        
        // Inserir na tabela de vendas (evitar duplicação na transação)
        await connection.query(`
          INSERT INTO ${process.env.TABLE3} (id_usuario, id_livro, quantidade, valor_total)
          VALUES (?, ?, ?, ?)
        `, [id_usuario, id_livro, quantidade, book.preco * quantidade]);

        console.log(`Livro ${id_livro} inserido com sucesso com quantidade ${quantidade}`);
      }

      await connection.commit();
      console.log('Transação de compra concluída com sucesso');
    } catch (error) {
      console.error('Erro na transação de compra, revertendo mudanças:', error);
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export { UserPurchaseService };
