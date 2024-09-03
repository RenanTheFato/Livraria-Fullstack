// import { databaseConnect } from "../database/connection";

// interface CartItemProps {
//   id_usuario: number;
//   id_livro: number;
//   quantidade: number;
// }

// class UserCartService {
//   async addItem({ id_usuario, id_livro, quantidade }: CartItemProps) {
//     const [rows]: [any[], any] = await databaseConnect.query(
//       `SELECT * FROM carrinho WHERE id_usuario = ? AND id_livro = ?`,
//       [id_usuario, id_livro]
//     );

//     if (rows.length > 0) {
//       await databaseConnect.query(
//         `UPDATE carrinho SET quantidade = quantidade + ? WHERE id_usuario = ? AND id_livro = ?`,
//         [quantidade, id_usuario, id_livro]
//       );
//     } else {
//       await databaseConnect.query(
//         `INSERT INTO carrinho (id_usuario, id_livro, quantidade) VALUES (?, ?, ?)`,
//         [id_usuario, id_livro, quantidade]
//       );
//     }
//   }

//   async removeItem(id_usuario: number, id_livro: number) {
//     await databaseConnect.query(
//       `DELETE FROM carrinho WHERE id_usuario = ? AND id_livro = ?`,
//       [id_usuario, id_livro]
//     );
//   }

//   async getCartItems(id_usuario: number) {
//     const [rows] = await databaseConnect.query(
//       `SELECT * FROM carrinho WHERE id_usuario = ?`,
//       [id_usuario]
//     );
//     return rows as CartItemProps[];
//   }

//   async clearCart(id_usuario: number) {
//     await databaseConnect.query(
//       `DELETE FROM carrinho WHERE id_usuario = ?`,
//       [id_usuario]
//     );
//   }
// }

// export { UserCartService };
