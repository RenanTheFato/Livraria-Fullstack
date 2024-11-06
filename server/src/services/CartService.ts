import { databaseConnect } from "../database/connection";
import 'dotenv';

class CartService {
  async adicionarItemAoCarrinho(usuarioId: number, produtoId: number, quantidade: number) {
    const [carrinho] = await databaseConnect.query(
      `SELECT id FROM ${process.env.TABLE3} WHERE usuario_id = ?`,
      [usuarioId]
    );
    let carrinhoId = (carrinho as any)[0]?.id;

    if (!carrinhoId) {
      const [resultado] = await databaseConnect.query(
        `INSERT INTO ${process.env.TABLE3} (usuario_id) VALUES (?)`,
        [usuarioId]
      );
      carrinhoId = (resultado as any).insertId;
    }

    const [itemExistente] = await databaseConnect.query(
      `SELECT id, quantidade FROM ${process.env.TABLE4} WHERE carrinho_id = ? AND produto_id = ?`,
      [carrinhoId, produtoId]
    );

    if ((itemExistente as any).length > 0) {
      const novoTotal = (itemExistente as any)[0].quantidade + quantidade;
      await databaseConnect.query(
        `UPDATE ${process.env.TABLE4} SET quantidade = ? WHERE id = ?`,
        [novoTotal, (itemExistente as any)[0].id]
      );
    } else {
      await databaseConnect.query(
        `INSERT INTO ${process.env.TABLE4} (carrinho_id, produto_id, quantidade) VALUES (?, ?, ?)`,
        [carrinhoId, produtoId, quantidade]
      );
    }

    return this.obterCarrinhoPorUsuarioId(usuarioId);
  }

  async obterCarrinhoPorUsuarioId(usuarioId: number) {
    try {
      const [itensCarrinho] = await databaseConnect.query(
        `SELECT ic.id, ic.produto_id, ic.quantidade, p.titulo, p.preco, p.imagem, 
                e.cnpj, (ic.quantidade * p.preco) AS preco_total 
         FROM ${process.env.TABLE4} ic 
         JOIN ${process.env.TABLE3} c ON ic.carrinho_id = c.id 
         JOIN ${process.env.TABLE1} p ON ic.produto_id = p.id 
         JOIN ${process.env.TABLE5} e ON p.editora = e.nome 
         WHERE c.usuario_id = ?`,
        [usuarioId]
      );

      console.log("Itens do carrinho com CNPJ da editora:", itensCarrinho);

      return itensCarrinho;
    } catch (error) {
      console.error("Erro ao obter itens do carrinho:", error);
      throw error;
    }
  }

  async removerItemDoCarrinho(itemCarrinhoId: number) {
    await databaseConnect.query(
      `DELETE FROM ${process.env.TABLE4} WHERE id = ?`,
      [itemCarrinhoId]
    );
  }
}

export { CartService };
