import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaUserCircle, FaBook, FaShoppingCart, FaTrash } from "react-icons/fa";
import { api } from "../service/api";

interface CartItem {
  id: number;
  nome: string;
  quantidade: number;
  preco_total: number;
  imagem: string;
}

function Header() {
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const type = localStorage.getItem("userType");
    setIsAuthenticated(!!token);
    setUserType(type);
    if (token) {
      fetchCartItems();
    }
  }, []);

  async function fetchCartItems() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token de autenticação não encontrado");
      return;
    }
    try {
      const response = await api.get("/carrinho/listar", {
        headers: {
          Authorization: `Barer ${token}`
        }
      });
      setCartItems(response.data.slice(0, 3));
    } catch (error) {
      console.error("Erro ao carregar itens do carrinho", error);
    }
  }

  async function handleRemoveItem(itemId: number) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("Token de autenticação não encontrado");
      return;
    }
    try {
      await api.delete(`/carrinho/remover`, { data: { id: itemId },  headers: {Authorization: `Barer ${token}`}});
      fetchCartItems();
    } catch (error) {
      console.error("Erro ao remover item do carrinho", error);
    }
  }

  function handleHome() {
    window.location.href = "/";
  }

  function handleCartDropdownToggle() {
    setIsCartDropdownOpen(!isCartDropdownOpen);
    setIsUserDropdownOpen(false);
  }

  function handleUserDropdownToggle() {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsCartDropdownOpen(false);
  }

  function handleNavigate(path: string) {
    navigate(path);
    setIsCartDropdownOpen(false);
    setIsUserDropdownOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
    window.location.reload();
    navigate("/");
  }

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  }

  return (
    <header className="bg-cyan-600 shadow-lg md:max-2xl relative">
      <nav className="flex flex-row md:mx-auto items-center">
        <div>
          <img className="w-16 mx-3 cursor-pointer" src="/logo.svg" alt="Logo" onClick={handleHome} />
        </div>
        <h2 className="font-roboto-black text-sky-50 text-[1.5rem] my-3 mx-10 md:text-4xl cursor-pointer" onClick={handleHome}>
          Livraria Encanto
        </h2>
        <div className="relative w-1/3 h-10 my-3 mx-8 flex items-center shadow-xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative w-full py-2 pr-36 pl-5 rounded-xl border-2 outline-none border-black placeholder-gray-400 
              placeholder:italic focus:bg-cyan-100 focus:placeholder-black focus:outline-none"
            placeholder="Pesquisar livro..."
          />
          <button
            type="submit"
            onClick={handleSearch}
            className="absolute w-16 h-full right-0 mx-[0.12rem] bg-indigo-400 outline-none border-2 
              border-r-transparent border-t-transparent border-b-transparent border-l-black flex items-center justify-center rounded-r-xl"
          >
            <FaSearch fill="#FFFFFF" />
          </button>
        </div>
        <div className="relative flex items-center ml-auto">
          {isAuthenticated && (
            <div className="h-14 my-1 px-5 flex items-center hover:cursor-pointer" onClick={handleCartDropdownToggle}>
              <FaShoppingCart fill="#FFFFFF" />
            </div>
          )}
          <div className="h-14 my-1 px-5 flex items-center hover:cursor-pointer" onClick={handleUserDropdownToggle}>
            <FaUser fill="#FFFFFF" />
          </div>
        </div>
      </nav>

      {isCartDropdownOpen && isAuthenticated && (
        <div className="animate-in fade-in-30 ease-in-out delay-0 duration-300 absolute right-0 w-72 bg-white shadow-lg rounded-md z-10 p-4">
          <h3 className="text-lg font-semibold mb-2">Meu Carrinho</h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio</p>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src={`${apiUrl}/uploads/${item.imagem}`} className="w-12 h-12 rounded" />
                    <div>
                      <p className="text-gray-800">{item.nome}</p>
                      <p className="text-sm text-gray-600">Qtd: {item.quantidade}</p>
                      <p className="text-sm text-gray-600">Preço: R$ {item.preco_total}</p>
                    </div>
                  </div>
                  <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleRemoveItem(item.id)} />
                </li>
              ))}
            </ul>
          )}
          <button className="text-blue-500 mt-3" onClick={() => navigate("/checkout")}>Ver tudo</button>
        </div>
      )}

      {isUserDropdownOpen && (
        <div className="animate-in fade-in-30 ease-in-out delay-0 duration-300 absolute right-0 w-48 bg-white shadow-lg rounded-md z-10">
          {isAuthenticated ? (
            <>
              <div
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleNavigate(userType === "publisher" ? "/publisher-profile" : "/user-profile")}
              >
                <FaUserCircle className="mr-2" /> Meu Perfil
              </div>
              <div
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={handleLogout}
              >
                <FaUserCircle className="mr-2" /> Logout
              </div>
            </>
          ) : (
            <>
              <div
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleNavigate("/user-login")}
              >
                <FaUserCircle className="mr-2" /> Login de Usuário
              </div>
              <div
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleNavigate("/publisher-login")}
              >
                <FaBook className="mr-2" /> Login de Editora
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
