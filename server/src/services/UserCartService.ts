
import { databaseConnect } from "../database/connection";

interface CartItemProps {
  id_usuario: number;
  id_livro: number;
  quantidade: number;
}

class UserCartService {
  async addItem({ id_usuario, id_livro, quantidade }: CartItemProps) {
    // Verificar se o item já existe no carrinho
    const [rows]: [any[], any]  = await databaseConnect.query(
      `SELECT * FROM ${process.env.TABLE4} WHERE id_usuario = ? AND id_livro = ?`,
      [id_usuario, id_livro]
    );

    if (rows.length > 0) {
      // Se o item já existe, apenas atualize a quantidade
      await databaseConnect.query(
        `UPDATE ${process.env.TABLE4} SET quantidade = quantidade + ? WHERE id_usuario = ? AND id_livro = ?`,
        [quantidade, id_usuario, id_livro]
      );
    } else {
      // Se o item não existe, insira um novo registro
      await databaseConnect.query(
        `INSERT INTO ${process.env.TABLE4} (id_usuario, id_livro, quantidade) VALUES (?, ?, ?)`,
        [id_usuario, id_livro, quantidade]
      );
    }
  }

  async removeItem(id_usuario: number, id_livro: number) {
    await databaseConnect.query(
      `DELETE FROM ${process.env.TABLE4} WHERE id_usuario = ? AND id_livro = ?`,
      [id_usuario, id_livro]
    );
  }

  async getCartItems(id_usuario: number) {
    const [rows] = await databaseConnect.query(
      `SELECT * FROM ${process.env.TABLE4} WHERE id_usuario = ?`,
      [id_usuario]
    );
    return rows as CartItemProps[];
  }

  async clearCart(id_usuario: number) {
    await databaseConnect.query(`DELETE FROM ${process.env.TABLE4} WHERE id_usuario = ?`, [id_usuario]);
  }
}

export { UserCartService };
