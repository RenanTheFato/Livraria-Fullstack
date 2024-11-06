import { databaseConnect } from "../database/connection";

class OrderService {
  async criarPedido(usuarioId: number) {
    const [itensCarrinho] = await databaseConnect.query(
      `SELECT ci.produto_id, ci.quantidade, p.preco 
       FROM ${process.env.TABLE4} ci 
       JOIN ${process.env.TABLE3} c ON ci.carrinho_id = c.id 
       JOIN ${process.env.TABLE1} p ON ci.produto_id = p.id 
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
      `INSERT INTO ${process.env.TABLE6} (usuario_id, total, status) VALUES (?, ?, 'COMPLETO')`,
      [usuarioId, total]
    );

    const pedidoId = (resultadoPedido as any).insertId;

    for (const item of dadosItens) {
      const precoTotal = item.preco * item.quantidade;
      await databaseConnect.query(
        `INSERT INTO ${process.env.TABLE7} (pedido_id, produto_id, quantidade, preco) VALUES (?, ?, ?, ?)`,
        [pedidoId, item.produto_id, item.quantidade, precoTotal]
      );
    }

    await databaseConnect.query(`DELETE FROM ${process.env.TABLE4} WHERE carrinho_id IN (SELECT id FROM ${process.env.TABLE3} WHERE usuario_id = ?)`, [usuarioId]);
    await databaseConnect.query(`DELETE FROM ${process.env.TABLE3} WHERE usuario_id = ?`, [usuarioId]);

    return { id: pedidoId, usuarioId, total, itens: dadosItens };
  }


  async obterPedidosPorUsuarioId(usuarioId: number) {
    const [pedidos] = await databaseConnect.query(
      `SELECT p.id, p.data_criacao, p.total, p.status
       FROM ${process.env.TABLE6} p
       WHERE p.usuario_id = ?`,
      [usuarioId]
    );

    const pedidosComItens = await Promise.all(
      (pedidos as any[]).map(async (pedido) => {
        const [itens] = await databaseConnect.query(
          `SELECT ip.produto_id, ip.quantidade, ip.preco 
           FROM ${process.env.TABLE7} ip 
           WHERE ip.pedido_id = ?`,
          [pedido.id]
        );

        return { ...pedido, itens };
      })
    );

    return pedidosComItens;
  }
}

export { OrderService };
