import { useState, useEffect } from "react";
import { api } from "../service/api";
import Header from "../components/HeaderGeneral";
import "../index.css";
import { useNavigate } from "react-router-dom";

interface BookProps {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
  editora: string;
  imagem: string;
}

function HomePage() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [displayedItems, setDisplayedItems] = useState<BookProps[]>([]);
  const [sportsBooks, setSportsBooks] = useState<BookProps[]>([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const res = await api.get("/list-book");
      const data: BookProps[] = res.data;

      const randomBooks = data.sort(() => 0.5 - Math.random());
      const booksSelected = randomBooks.slice(0, 4);

      const sports =  data.filter((book) => book.categoria === "Esportivo");

      setBooks(data);
      setDisplayedItems(booksSelected);
      setSportsBooks(sports);

      console.log(res.data);
    } catch (error) {
      console.error("Erro ao carregar os livros", error);
    }
  }

  function handleBookClick(id: number) {
    navigate(`/book/${id}`);
  }

  function handleSportsBooks(){
    window.location.href = `/search?query=esportivo`;
  }

  return (
    <div className="w-full min-h-screen bg-stone-300 md:max-2xl">
      <Header />
      <div className="flex justify-center items-center">
        <section className="w-11/12 h-72 border-3 my-10 bg-[url('./src/assets/2_20240911_155529_0001~2.png')] bg-no-repeat bg-cover border-slate-400 shadow-lg border-2 flex justify-center items-center">
        </section>
      </div>

      <div className="w-full min-h-screen">
        <h1 className="font-roboto-italic italic text-2xl mx-14 w-[23rem] h-auto border-b-indigo-600 border-r-transparent border-t-transparent border-l-transparent border-2">
          RECOMENDADOS PARA VOCÊ
        </h1>

        <div className="flex justify-center items-center py-10">
          <section className="w-11/12 h-72 flex flex-row space-x-10 py-2 px-2 rounded-xl bg-gradient-to-t from-slate-200 to-slate-300">
            {displayedItems.map((book) => (
              <article
                key={book.id}
                className="h-full w-72 bg-white rounded p-2 relative shadow-xl shadow-indigo-300 hover:scale-105 duration-200 cursor-pointer"
                onClick={() => handleBookClick(book.id)}
              >
                {book.imagem && (
                  <div className="flex justify-center mb-2">
                    <img
                      src={`${apiUrl}/uploads/${book.imagem}`}
                      alt={book.titulo}
                      className="max-w-32 h-44 object-contain rounded"
                    />
                  </div>
                )}
                <p>
                  <span className="font-medium">Título: </span>
                  {book.titulo}
                </p>
                <p>
                  <span className="font-medium">Autor: </span>
                  {book.autor}
                </p>
                <p>
                  <span className="font-medium">Editora: </span>
                  {book.editora}
                </p>
              </article>
            ))}
          </section>
        </div>

        <h1 className="font-roboto-italic italic text-2xl mx-14 w-48 h-auto border-b-indigo-600 border-r-transparent border-t-transparent border-l-transparent border-2">
          Livros Esportivos
        </h1>

        <div className="flex justify-center items-center py-10">
          <section className="w-11/12 h-72 flex flex-row space-x-10 py-2 px-2 rounded-xl bg-gradient-to-t from-slate-200 to-slate-300">
            {sportsBooks.slice(0, 4).map((book) => (
              <article
                key={book.id}
                className="h-full w-72 bg-white rounded p-2 relative shadow-xl shadow-indigo-300 hover:scale-105 duration-200 cursor-pointer"
                onClick={() => handleBookClick(book.id)}
              >
                {book.imagem && (
                  <div className="flex justify-center mb-2">
                    <img
                      src={`${apiUrl}/uploads/${book.imagem}`}
                      alt={book.titulo}
                      className="max-w-32 h-44 object-contain rounded"
                    />
                  </div>
                )}
                <p>
                  <span className="font-medium">Título: </span>
                  {book.titulo}
                </p>
                <p>
                  <span className="font-medium">Autor: </span>
                  {book.autor}
                </p>
                <p>
                  <span className="font-medium">Editora: </span>
                  {book.editora}
                </p>
              </article>
            ))}
          </section>
        </div>

        <div className="flex justify-center py-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleSportsBooks}
          >
            Ver todos os livros esportivos
          </button>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
