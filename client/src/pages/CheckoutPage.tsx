import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../service/api";

interface CartItem {
  id: number;
  titulo: string;
  quantidade: number;
  preco_total: string;  // Definido como string na resposta da API
  imagem: string;
  cnpj: string;
}

function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<"view" | "payment" | "invoice">("view");
  const [paymentMethod, setPaymentMethod] = useState<"PIX" | "Card" | null>(null);
  const [pixForm, setPixForm] = useState(false);
  const [cardForm, setCardForm] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchCartItems() {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await api.get("/carrinho/listar", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = response.data;

        setCartItems(items);

        const total = items.reduce((sum: number, item: CartItem) => sum + parseFloat(item.preco_total), 0);
        setTotalPrice(total);
      } catch (err) {
        console.error("Erro ao carregar itens do carrinho", err);
        setError("Erro ao carregar o carrinho.");
      }
    }

    fetchCartItems();
  }, []);

  async function handleCheckout() {
    const token = localStorage.getItem("authToken");
    setLoading(true);
    try {
      await api.post("/pedido/finalizar", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStage("invoice");
    } catch (err) {
      setError("Erro ao concluir a compra");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function renderViewStage() {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Concluir Compra</h1>
        {error && <p className="text-red-500">{error}</p>}

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <ul className="space-y-4 w-full">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <img src={`${apiUrl}/uploads/${item.imagem}`} alt={item.titulo} className="w-16 h-16 rounded" />
                <div className="flex-1">
                  <p className="font-semibold">{item.titulo}</p>
                  <p>Quantidade: {item.quantidade}</p>
                  <p>Preço Total: R$ {parseFloat(item.preco_total).toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 text-lg font-bold text-left w-full">
          Total: R$ {totalPrice.toFixed(2)}
        </div>
        <button
          onClick={() => setStage("payment")}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 mt-4 -mr-[65%]"
        >
          Prosseguir para Pagamento
        </button>
      </div>
    );
  }

  function renderPaymentStage() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4 text-center">Escolha a Forma de Pagamento</h2>
        <div className="space-y-2 w-full max-w-sm">
          <button
            onClick={() => { setPaymentMethod("PIX"); setPixForm(true); setCardForm(false); }}
            className="bg-gray-200 p-2 rounded w-full"
          >
            PIX
          </button>
          <button
            onClick={() => { setPaymentMethod("Card"); setCardForm(true); setPixForm(false); }}
            className="bg-gray-200 p-2 rounded w-full"
          >
            Cartão
          </button>
        </div>

        {pixForm && (
          <div className="mt-4 w-full max-w-sm bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">Formulário PIX</h3>
            <p>Insira os dados para pagamento via PIX.</p>
            <input type="text" placeholder="Chave PIX" className="w-full p-2 mt-2 border rounded" />
          </div>
        )}

        {cardForm && (
          <div className="mt-4 w-full max-w-sm bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">Formulário Cartão</h3>
            <p>Insira os dados para pagamento via Cartão.</p>
            <input type="text" placeholder="Número do Cartão" className="w-full p-2 mt-2 border rounded" />
            <input type="text" placeholder="Nome no Cartão" className="w-full p-2 mt-2 border rounded" />
            <input type="text" placeholder="Data de Vencimento" className="w-full p-2 mt-2 border rounded" />
            <input type="text" placeholder="CVV" className="w-full p-2 mt-2 border rounded" />
            <input type="password" placeholder="Senha" className="w-full p-2 mt-2 border rounded" />
          </div>
        )}

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
          disabled={!paymentMethod || loading}
        >
          {loading ? "Processando..." : "Confirmar Pagamento"}
        </button>
        <button
          onClick={() => setStage("view")}
          className="text-blue-500 underline mt-4"
        >
          Voltar ao Carrinho
        </button>
      </div>
    );
  }

  function renderInvoiceStage() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">Nota Fiscal</h1>
            <p className="text-lg font-bold">Livraria Encanto</p>
          </div>
          <ul className="space-y-4 text-left">
            {cartItems.map((item) => (
              <li key={item.id}>
                <p><strong>Produto:</strong> {item.titulo}</p>
                <p><strong>Quantidade:</strong> {item.quantidade}</p>
                <p><strong>Preço Unitário:</strong> R$ {(parseFloat(item.preco_total) / item.quantidade).toFixed(2)}</p>
                <p><strong>CNPJ da Editora:</strong> {item.cnpj}</p>
                <p><strong>Preço Total:</strong> R$ {parseFloat(item.preco_total).toFixed(2)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-lg font-bold">Valor Total da Compra: R$ {totalPrice.toFixed(2)}</div>
          <div className="flex justify-center mt-4">
            <button onClick={() => navigate("/user-profile/user-history")} className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700">
              Ver Histórico de Compras
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center space-y-6 p-10">
      {stage === "view" && renderViewStage()}
      {stage === "payment" && renderPaymentStage()}
      {stage === "invoice" && renderInvoiceStage()}
    </main>
  );
}

export default CheckoutPage;
