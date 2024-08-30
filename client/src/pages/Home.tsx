import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { api } from "../service/api";
import "../index.css";

interface BookProps {
  id: number;
  titulo: string;
  autor: string;
  editora: string;
}

function HomePage() {
  const [books, setBooks] = useState<BookProps[]>([]);
  const [displayedItems, setDisplayedItems] = useState<BookProps[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const res = await api.get("/list-book");
      const data: BookProps[] = res.data;

      const randomBooks = data.sort(() => 0.5 - Math.random());
      const booksSelected = randomBooks.slice(0, 4);

      setBooks(data);
      setDisplayedItems(booksSelected);

      console.log(res.data);
    } catch (error) {
      console.error("Erro ao carregar os livros", error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-stone-300 md:max-2xl">
      <header className="bg-cyan-600 shadow-lg md:max-2xl">
        <nav className="flex flex-row md:mx-auto">
          <div>
            <img className="w-16 mx-3" src='./src/assets/logo.svg' alt="Logo"/>
          </div>
          <h2 className="font-roboto-black text-sky-50 text-[1.5rem] my-3 mx-10 md:text-4xl">Livraria Encanto</h2>
          <div className="relative w-1/3 h-10 my-3 mx-8 flex items-center shadow-xl">
            <input 
              type="text" 
              className="relative w-full py-2 pr-36 pl-5 rounded-xl border-2 outline-none border-black placeholder-gray-400 
              placeholder:italic focus:bg-cyan-100 focus:placeholder-black focus:outline-none" 
              placeholder="Pesquisar livro..." 
            />
            <button 
              type="submit" 
              className="absolute w-16 h-full right-0 mx-[0.12rem] bg-indigo-400 outline-none border-2 
              border-r-transparent border-t-transparent border-b-transparent border-l-black flex items-center justify-center rounded-r-xl" 
            >
              <FaSearch fill="#FFFFFF" />
            </button>
          </div>
          <div className="h-14 my-1 px-5 absolute right-0 mx-4 flex items-center rounded-full bg-indigo-400 shadow-xl hover:cursor-pointer">
            <FaUser fill="#FFFFFF" />
          </div>
        </nav>
      </header>

      <div className="flex justify-center items-center">
        <section className="w-11/12 h-72 border-3 my-10 border-black bg-indigo-600 flex justify-center items-center">
          BANNER
        </section>
      </div>

      <div className="w-full min-h-screen">
        <h1 className="font-roboto-italic italic text-2xl mx-14 w-[23rem] h-auto border-b-indigo-600 border-r-transparent border-t-transparent border-l-transparent border-2">
          RECOMENDADOS PARA VOCÊ
        </h1>
        <div className="flex justify-center items-center py-10">
          <section className="w-11/12 h-72 flex flex-row space-x-10 py-2 px-2 rounded-xl bg-gradient-to-t from-slate-200 to-slate-300">
            {displayedItems.map((item) => (
              <article key={item.id} className="h-full w-72 bg-white rounded p-2 relative shadow-xl shadow-indigo-300
              hover:scale-105 duration-200">
                <p><span className="font-medium">Título: </span>{item.titulo}</p>
                <p><span className="font-medium">Autor: </span>{item.autor}</p>
                <p><span className="font-medium">Editora: </span>{item.editora}</p>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
