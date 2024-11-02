import { databaseConnect } from "../database/connection";

class CartService {
  async adicionarItemAoCarrinho(usuarioId: number, produtoId: number, quantidade: number) {
    // Verifica se o carrinho do usuário já existe
    const [carrinho] = await databaseConnect.query(
      `SELECT id FROM carrinhos WHERE usuario_id = ?`, 
      [usuarioId]
    );
    let carrinhoId = (carrinho as any)[0]?.id;

    // Se o carrinho não existir, cria um novo
    if (!carrinhoId) {
      const [resultado] = await databaseConnect.query(
        `INSERT INTO carrinhos (usuario_id) VALUES (?)`, 
        [usuarioId]
      );
      carrinhoId = (resultado as any).insertId;
    }

    // Verifica se o produto já existe no carrinho
    const [itemExistente] = await databaseConnect.query(
      `SELECT id, quantidade FROM itens_carrinho WHERE carrinho_id = ? AND produto_id = ?`,
      [carrinhoId, produtoId]
    );

    if ((itemExistente as any).length > 0) {
      // Atualiza a quantidade do item existente
      const novoTotal = (itemExistente as any)[0].quantidade + quantidade;
      await databaseConnect.query(
        `UPDATE itens_carrinho SET quantidade = ? WHERE id = ?`,
        [novoTotal, (itemExistente as any)[0].id]
      );
    } else {
      // Insere o novo item no carrinho
      await databaseConnect.query(
        `INSERT INTO itens_carrinho (carrinho_id, produto_id, quantidade) VALUES (?, ?, ?)`,
        [carrinhoId, produtoId, quantidade]
      );
    }

    return this.obterCarrinhoPorUsuarioId(usuarioId);
  }

  async obterCarrinhoPorUsuarioId(usuarioId: number) {
    const [itensCarrinho] = await databaseConnect.query(
      `SELECT ic.id, ic.produto_id, ic.quantidade 
       FROM itens_carrinho ic 
       JOIN carrinhos c ON ic.carrinho_id = c.id 
       WHERE c.usuario_id = ?`,
      [usuarioId]
    );
    
    return itensCarrinho;
  }

  async removerItemDoCarrinho(itemCarrinhoId: number) {
    // Remove o item específico com base no ID do item no carrinho
    await databaseConnect.query(
      `DELETE FROM itens_carrinho WHERE id = ?`,
      [itemCarrinhoId]
    );
  }
}

export { CartService };
