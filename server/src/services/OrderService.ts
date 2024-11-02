import { databaseConnect } from "../database/connection";

class OrderService {
  async criarPedido(usuarioId: number) {
    const [itensCarrinho] = await databaseConnect.query(
      `SELECT ci.produto_id, ci.quantidade, p.preco 
       FROM itens_carrinho ci 
       JOIN carrinhos c ON ci.carrinho_id = c.id 
       JOIN produtos p ON ci.produto_id = p.id 
       WHERE c.usuario_id = ?`, 
      [usuarioId]
    ) as any;

    if (itensCarrinho.length === 0) throw new Error("Carrinho vazio");

    let total = 0;
    const dadosItens = itensCarrinho.map((item: any) => {
      total += item.preco * item.quantidade;
      return {
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco: item.preco,
      };
    });

    const [resultadoPedido] = await databaseConnect.query(
      `INSERT INTO pedidos (usuario_id, total, status) VALUES (?, ?, 'COMPLETO')`,
      [usuarioId, total]
    );

    const pedidoId = (resultadoPedido as any).insertId;

    for (const item of dadosItens) {
      await databaseConnect.query(
        `INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco) VALUES (?, ?, ?, ?)`,
        [pedidoId, item.produto_id, item.quantidade, item.preco]
      );
    }

    await databaseConnect.query(`DELETE FROM itens_carrinho WHERE carrinho_id IN (SELECT id FROM carrinhos WHERE usuario_id = ?)`, [usuarioId]);
    await databaseConnect.query(`DELETE FROM carrinhos WHERE usuario_id = ?`, [usuarioId]);

    return { id: pedidoId, usuarioId, total, itens: dadosItens };
  }
}

export { OrderService };
