import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsFillBellFill } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from 'react-icons/fa';
import { BsGraphUp } from "react-icons/bs";
import { publisherAuth } from '../hooks/PublisherAuthHook';

function PublisherDashboard() {
  const publisherData = publisherAuth();
  console.log(publisherData)
  const navigate = useNavigate();


  function handleLogout(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <>
      {publisherData ? (
        <main className="w-full min-h-screen bg-slate-500 flex flex-col">

          <div className="w-full h-20 flex flex-row items-center bg-amber-900 drop-shadow-xl">
            <div className="h-full mx-10 flex items-center text-5xl">
              <FaUser fill="white" />
            </div>
            <h1 className="text-white font-roboto font-bold text-xl">
              Bem-vindo {publisherData.nome}!
            </h1>
          </div>

          <div className="flex-grow flex flex-row relative">
            <aside className="w-60 bg-slate-300 text-black py-2 border-r-black border-r-2 shadow-xl my-1 mx-1 rounded-md relative">
              <nav className="flex flex-col space-y-2">

                <Link to="publisher-notify">
                  <div className="flex items-center space-x-2 w-full h-20 border-b-amber-900 border-b-2 border-t-amber-900 border-t-2 bg-white cursor-pointer">
                    <BsFillBellFill className="text-2xl mx-2" />
                    <span className="font-roboto text-lg">Notificações</span>
                  </div>
                </Link>

                <Link to="form-book">
                  <div className="flex items-center space-x-2 w-full h-20 border-b-amber-900 border-b-2 border-t-amber-900 border-t-2 bg-white cursor-pointer">
                    <FaBook className="text-2xl mx-2" />
                    <span className="font-roboto text-lg">Inserir Livros</span>
                  </div>
                </Link>

                <Link to="publisher-cash">
                  <div className="flex items-center space-x-2 w-full h-20 border-b-amber-900 border-b-2 border-t-amber-900 border-t-2 bg-white cursor-pointer">
                    <BsGraphUp className="text-2xl mx-2" />
                    <span className="font-roboto text-lg">Faturamento</span>
                  </div>
                </Link>

                <div className="flex items-center space-x-2 w-full h-20 absolute bottom-2 border-b-slate-50 border-b-2 border-t-slate-50 border-t-2 bg-red-500 text-white cursor-pointer" onClick={handleLogout}>
                    <TbLogout2 className="text-2xl mx-2" />
                    <span className="font-roboto text-lg">Logout</span>
                    
                </div>

              </nav>
            </aside>

            <section className="flex-grow p-2">
              <div className="w-full h-full bg-white rounded-lg shadow overflow-auto">
                <Outlet />
              </div>
            </section>
            
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

export default PublisherDashboard;