import { databaseConnect } from '../database/connection';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class CarrinhoService {
    static async adicionarItem(id_usuario: number, id_livro: number, quantidade: number) {
        const connection = await databaseConnect.getConnection();
        try {

            const [carrinho] = await connection.query<RowDataPacket[]>(
                `SELECT id_carrinho FROM carrinho WHERE id_usuario = ? AND status = 'aberto'`,
                [id_usuario]
            );

            let id_carrinho;

            if (carrinho.length === 0) {
                const [result] = await connection.query<ResultSetHeader>(
                    `INSERT INTO carrinho (id_usuario) VALUES (?)`,
                    [id_usuario]
                );
                id_carrinho = result.insertId;
            } else {
                id_carrinho = carrinho[0].id_carrinho;
            }

            await connection.query<ResultSetHeader>(
                `INSERT INTO carrinho_itens (id_carrinho, id_livro, quantidade)
                 VALUES (?, ?, ?)
                 ON DUPLICATE KEY UPDATE quantidade = quantidade + VALUES(quantidade)`,
                [id_carrinho, id_livro, quantidade]
            );

            return { success: true, message: 'Item adicionado ao carrinho com sucesso!' };
        } catch (error) {
            throw new Error('Erro ao adicionar item ao carrinho.');
        } finally {
            connection.release();
        }
    }

    static async removerItem(id_usuario: number, id_item: number) {
        const connection = await databaseConnect.getConnection();
        try {
            // Verificar se o item pertence ao carrinho do usuário
            const [item] = await connection.query<RowDataPacket[]>(
                `SELECT ci.id_item FROM carrinho_itens ci
                 JOIN carrinho c ON ci.id_carrinho = c.id_carrinho
                 WHERE ci.id_item = ? AND c.id_usuario = ? AND c.status = 'aberto'`,
                [id_item, id_usuario]
            );

            if (item.length === 0) {
                return { success: false, message: 'Item não encontrado no carrinho.' };
            }

            // Remover o item do carrinho
            await connection.query<ResultSetHeader>(`DELETE FROM carrinho_itens WHERE id_item = ?`, [id_item]);

            return { success: true, message: 'Item removido do carrinho com sucesso!' };
        } catch (error) {
            throw new Error('Erro ao remover item do carrinho.');
        } finally {
            connection.release();
        }
    }

    static async obterCarrinho(id_usuario: number) {
        const connection = await databaseConnect.getConnection();
        try {
            // Obter os itens do carrinho "aberto" do usuário
            const [itens] = await connection.query<RowDataPacket[]>(
                `SELECT ci.id_item, l.titulo, ci.quantidade, l.preco
                 FROM carrinho_itens ci
                 JOIN carrinho c ON ci.id_carrinho = c.id_carrinho
                 JOIN livros l ON ci.id_livro = l.id_livro
                 WHERE c.id_usuario = ? AND c.status = 'aberto'`,
                [id_usuario]
            );

            return itens;
        } catch (error) {
            throw new Error('Erro ao obter itens do carrinho.');
        } finally {
            connection.release();
        }
    }

    static async finalizarCompra(id_usuario: number) {
        const connection = await databaseConnect.getConnection();
        try {
            // Obter o carrinho "aberto" do usuário
            const [carrinho] = await connection.query<RowDataPacket[]>(
                `SELECT id_carrinho FROM carrinho WHERE id_usuario = ? AND status = 'aberto'`,
                [id_usuario]
            );

            if (carrinho.length === 0) {
                return { success: false, message: 'Carrinho vazio ou não encontrado.' };
            }

            const id_carrinho = carrinho[0].id_carrinho;

            // Obter os itens do carrinho
            const [itens] = await connection.query<RowDataPacket[]>(
                `SELECT ci.id_livro, ci.quantidade, l.preco
                 FROM carrinho_itens ci
                 JOIN livros l ON ci.id_livro = l.id_livro
                 WHERE ci.id_carrinho = ?`,
                [id_carrinho]
            );

            if (itens.length === 0) {
                return { success: false, message: 'Nenhum item no carrinho.' };
            }

            // Calcular o total da compra
            const total = itens.reduce((acc: number, item: any) => acc + item.quantidade * item.preco, 0);

            // Inserir a venda na tabela "vendas"
            const [result] = await connection.query<ResultSetHeader>(
                `INSERT INTO vendas (id_usuario, total) VALUES (?, ?)`,
                [id_usuario, total]
            );

            const id_venda = result.insertId;

            // Inserir os itens da venda na tabela "venda_itens"
            const vendaItensPromises = itens.map((item: any) =>
                connection.query<ResultSetHeader>(
                    `INSERT INTO venda_itens (id_venda, id_livro, quantidade, preco)
                     VALUES (?, ?, ?, ?)`,
                    [id_venda, item.id_livro, item.quantidade, item.preco]
                )
            );

            await Promise.all(vendaItensPromises);

            // Atualizar o status do carrinho para "finalizado"
            await connection.query<ResultSetHeader>(
                `UPDATE carrinho SET status = 'finalizado' WHERE id_carrinho = ?`,
                [id_carrinho]
            );

            return { success: true, message: 'Compra finalizada com sucesso!' };
        } catch (error) {
            throw new Error('Erro ao finalizar a compra.');
        } finally {
            connection.release();
        }
    }
}
