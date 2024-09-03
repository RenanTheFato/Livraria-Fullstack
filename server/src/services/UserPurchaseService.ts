// import { databaseConnect } from "../database/connection";
// import { RowDataPacket } from 'mysql2';

// interface Product {
//   id: number;
//   titulo: string;
//   preco: number;
// }

// class UserPurchaseService {
//   async execute(id_usuario: number, id_livro: number, quantidade: number) {
//     const connection = await databaseConnect.getConnection();

//     try {
//       await connection.beginTransaction();

//       const [productRows] = await connection.query<RowDataPacket[]>(
//         'SELECT * FROM livros WHERE id = ?',
//         [id_livro]
//       );

//       const products: Product[] = productRows.map(row => ({
//         id: row.id,
//         titulo: row.titulo,
//         preco: row.preco,
//       }));

//       const product = products[0];

//       if (!product) {
//         throw new Error('Produto não encontrado.');
//       }

//       const totalPrice = product.preco * quantidade;
//       await connection.query(
//         'INSERT INTO pedidos (id_usuario, id_livro, quantidade, valor_total) VALUES (?, ?, ?, ?)',
//         [id_usuario, id_livro, quantidade, totalPrice]
//       );

//       await connection.commit();

//       return { message: 'Compra realizada com sucesso.' };
//     } catch (error) {
//       await connection.rollback();
//       throw error;
//     } finally {
//       connection.release();
//     }
//   }
// }

// export { UserPurchaseService };
