// import { databaseConnect } from "../database/connection";
// import { UserCartService } from "./UserCartService";
// import { ResultSetHeader } from "mysql2";

// class UserPurchaseService {
//   async execute(id_usuario: number) {

//     try {

//       const userCartService = new UserCartService();
//       const cartItems = await userCartService.getCartItems(id_usuario);

//       if (cartItems.length === 0) {
//         throw new Error('Carrinho vazio');
//       }

//       const [result] = await databaseConnect.query<ResultSetHeader>(`
//         INSERT INTO compras (id_usuario, data_compra) VALUES (?, NOW())
//       `, [id_usuario]);

//       const id_compra = result.insertId;

//       for (const item of cartItems) {
//         const { id_livro, quantidade } = item;

//         const [bookRows] = await databaseConnect.query(`SELECT preco FROM livros WHERE id = ?`, [id_livro]);
//         const book = (bookRows as any)[0];
        
//         if (!book) {
//           throw new Error('Livro não encontrado');
//         }

//         console.log(`Iniciando inserção para compra ID: ${id_compra}`);
//         console.log(`Processando livro ID: ${id_livro} com quantidade: ${quantidade} e preço: ${book.preco}`);

//         const result2 = await databaseConnect.query(`
//           INSERT INTO vendas (id_compra, id_livro, quantidade, valor_total)
//           VALUES (?, ?, ?, ?)
//         `, [id_compra, id_livro, quantidade, book.preco * quantidade]);

//         console.log(`Inserção completa para livro ID: ${id_livro}, Resultado: `, result2);
//       }


//       await userCartService.clearCart(id_usuario);

//       return { message: 'Compra realizada com sucesso', id_compra };
//     } catch (error) {
//       throw error;
//     }
//   }

//   async getUserPurchases(id_usuario: number) {
//     const [rows] = await databaseConnect.query(`
//       SELECT c.id AS compra_id, c.data_compra, v.id_livro, v.quantidade, v.valor_total, l.titulo 
//       FROM compras c
//       JOIN vendas v ON c.id = v.id_compra
//       JOIN livros l ON v.id_livro = l.id
//       WHERE c.id_usuario = ?
//     `, [id_usuario]);

//     return rows;
//   }
// }

// export { UserPurchaseService };
