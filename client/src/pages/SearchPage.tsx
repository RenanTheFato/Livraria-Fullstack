import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../service/api";
import Header from "../components/HeaderGeneral";
import { useNavigate } from "react-router-dom";

interface BookProps {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  editora: string;
  imagem: string;
}

function SearchResultsPage() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
    const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      searchBooks(query);
    }
  }, [query]);

  async function searchBooks(query: string) {
    try {
      const res = await api.get(`/search-books?search=${query}`);
      setBooks(res.data);
    } catch (error) {
      console.error("Erro ao pesquisar livros", error);
    }
  }

  function handleBookClick(id: number) {
    navigate(`/book/${id}`);
  }

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  return (
    <div>
      <Header />
      <div className="w-full min-h-screen bg-stone-300 flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold mb-6">Resultados da pesquisa por: {query}</h1>
        <div className="w-full max-w-xl px-4">
          <div className="flex flex-col space-y-6">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book.id} onClick={() => handleBookClick(book.id)}  className="border border-gray-300 rounded-lg bg-white shadow-md p-4 flex flex-col items-center hover:scale-105 duration-200 cursor-pointer">
                  <img
                    src={`${apiUrl}/uploads/${book.imagem}`}
                    alt={book.titulo}
                    className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <h2 className="text-xl font-semibold mb-2">{book.titulo}</h2>
                  <p className="text-gray-700 mb-1">Autor: {book.autor}</p>
                  <p className="text-gray-600 mb-1">Editora: {book.editora}</p>
                  <p className="text-gray-500">Categoria: {book.categoria}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700 text-center">Nenhum resultado encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultsPage;
