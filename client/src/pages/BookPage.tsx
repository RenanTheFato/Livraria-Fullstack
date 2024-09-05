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
}

function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookProps | null>(null);

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

  if (!book) {
    return <p>Carregando...</p>;
  }

  return (
    <>
    <Header />
    {book ? (
      <main className="flex flex-col w-full min-h-screen justify-center items-center space-y-10 bg-slate-300">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-4">
        <h1 className="text-3xl font-bold mb-4">{book.titulo}</h1>
        <p className="text-lg mb-2"><span className="font-semibold">Autor:</span> {book.autor}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.editora}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.categoria}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.classificacao}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.descricao}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.paginas}</p>
        <p className="text-lg mb-2"><span className="font-semibold">Editora:</span> {book.preco}</p>
      </div>
      </main>

    ) : (
      <main className="flex flex-col w-full min-h-screen justify-center items-center space-y-10 bg-slate-300">
      <AiOutlineLoading3Quarters className="animate-spin text-9xl" />
      <span className="font-roboto text-xl">
        Carregando informações do usuário...
      </span>
    </main>
    )}
    </>
  );
}

export default BookPage;
