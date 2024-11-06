import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../service/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Header from "../components/HeaderGeneral";

interface BookProps {
  id: number;
  titulo: string;
  descricao: string;
  autor: string;
  editora: string;
  categoria: string;
  classificacao: string;
  paginas: number;
  ano_pub: number;
  preco: number;
  imagem: string;
}

function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookProps | null>(null);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await api.get(`/book/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Erro ao carregar o livro", error);
      }
    }

    loadBook();
  }, [id]);

  async function handleAddToCart() {
    try {
      await api.post(`/carrinho/adicionar`, { produtoId: book?.id, quantidade: 1 }, { headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` } });
      alert("Item adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho", error);
      alert("Erro ao adicionar item ao carrinho");
    }
  }

  if (!book) {
    return (
      <main className="flex flex-col w-full min-h-screen justify-center items-center space-y-10 bg-slate-300">
        <AiOutlineLoading3Quarters className="animate-spin text-9xl" />
        <span className="font-roboto text-xl">Carregando informações do livro...</span>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col w-full min-h-screen justify-center items-center space-y-10 bg-slate-300">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-4 flex">
          <div className="flex-none w-1/3 pr-6">
            {book.imagem && (
              <img src={`${apiUrl}/uploads/${book.imagem}`} alt={book.titulo} className="w-full h-auto rounded-lg" />
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{book.titulo}</h1>
            <p className="text-lg mb-2"><span className="font-semibold">Autor:</span> {book.autor}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.editora}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Categoria:</span> {book.categoria}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Classificação:</span> {book.classificacao}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Número de Páginas:</span> {book.paginas}</p>
            <p className="text-lg mb-2"><span className="font-semibold">Preço:</span> R${book.preco}</p>
            <p className="text-lg mt-4"><span className="font-semibold">Descrição:</span> {book.descricao}</p>
            <button
              onClick={handleAddToCart}
              className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg shadow-md hover:bg-cyan-700"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default BookPage;