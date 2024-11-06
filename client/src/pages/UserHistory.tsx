import { useEffect, useState } from "react";
import { api } from "../service/api";

interface OrderItem {
  produto_id: number;
  quantidade: number;
  preco: number;
}

interface Order {
  id: number;
  data_criacao: string;
  total: number;
  status: string;
  itens: OrderItem[];
}

function UserHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/pedido/visualizar", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Erro ao carregar histórico de compras", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <main className="w-full h-full overflow-hidden">
      <h1 className="font-roboto font-bold text-3xl m-10 underline decoration-cyan-400">
        Histórico de Compras
      </h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <span className="font-roboto text-xl">Carregando...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="flex my-56 justify-center items-center">
          <span className="font-roboto text-2xl">Você ainda não realizou nenhuma compra.</span>
        </div>
      ) : (
        <div className="space-y-6 px-10">
          {orders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg shadow">
              <h2 className="text-lg font-bold">
                Pedido #{order.id} - {order.status}
              </h2>
              <p>Data: {new Date(order.data_criacao).toLocaleDateString()}</p>
              <p>Total: R$ {Number(order.total).toFixed(2)}</p>
              <ul className="mt-3 space-y-2">
                {order.itens.map((item) => (
                  <li key={item.produto_id}>
                    Produto ID: {item.produto_id}, Quantidade: {item.quantidade}, Preço: R$ {Number(item.preco).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default UserHistory;
