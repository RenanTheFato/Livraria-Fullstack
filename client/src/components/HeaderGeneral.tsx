import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaUserCircle, FaBook } from "react-icons/fa";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const type = localStorage.getItem("userType");
    setIsAuthenticated(!!token);
    setUserType(type);
  }, []);

  function handleHome(){
    window.location.href = "/"
  }

  function handleDropdownToggle() {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function handleNavigate(path: string) {
    navigate(path);
    setIsDropdownOpen(false);
  };

  function handleLogout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
    window.location.reload();
    navigate("/");
  };

  function handleSearch() {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  }

  return (
    <header className="bg-cyan-600 shadow-lg md:max-2xl relative">
      <nav className="flex flex-row md:mx-auto items-center">
        <div>
          <img className="w-16 mx-3 cursor-pointer" src="/logo.svg" alt="Logo" onClick={handleHome}/>
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
          <div
            className="h-14 my-1 px-5 flex items-center hover:cursor-pointer"
            onClick={handleDropdownToggle}
          >
            <FaUser fill="#FFFFFF" />
          </div>
        </div>
      </nav>
      {isDropdownOpen && (
        <div
          className="animate-in fade-in-30 ease-in-out delay-0 duration-300
          absolute right-0 w-48 bg-white shadow-lg rounded-md z-10"
        >
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
