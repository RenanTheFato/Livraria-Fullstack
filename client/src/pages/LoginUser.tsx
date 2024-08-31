import { useState } from "react";

function LoginUser() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  function LoginForm() {
    return (
      <>
        <form className="flex flex-col w-full px-10 my-16 space-y-10">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-cyan-300 focus:outline-1 focus:outline-teal-300"
            placeholder="Insira seu email..."
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-cyan-300 focus:outline-1 focus:outline-teal-300"
            placeholder="Insira sua senha..."
          />
          <input
            type="submit"
            className="bg-blue-600 p-2 rounded font-bold font-roboto-bold text-sm cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-400 hover:scale-105 hover:transition-all"
            value="ENTRAR"
          />
        </form>
        <div className="flex flex-row w-full relative">
          <span className="text-black text-lg absolute mx-10">
            Não tem um cadastro?
          </span>
          <span
            className="text-blue-600 text-lg absolute right-0 mx-10 cursor-pointer"
            onClick={handleFormSwitch}
          >
            Crie Já!
          </span>
        </div>
      </>
    );
  }

  function SingupForm() {
    return (
      <>
        <form className="flex flex-col w-full px-10 my-14 space-y-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-cyan-300 focus:outline-1 focus:outline-teal-300"
            placeholder="Insira seu nome..."
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-cyan-300 focus:outline-1 focus:outline-teal-300"
            placeholder="Insira seu email..."
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-cyan-300 focus:outline-1 focus:outline-teal-300"
            placeholder="Crie uma senha..."
          />
          <input
            type="submit"
            className="bg-blue-600 p-2 rounded font-bold font-roboto-bold text-sm cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-400 hover:scale-105 hover:transition-all"
            value="CADASTRAR"
          />
        </form>
        <div className="flex flex-row w-full relative -my-5">
          <span className="text-black text-lg absolute mx-10">
            Já tem uma conta?
          </span>
          <span
            className="text-blue-600 text-lg absolute right-0 mx-10 cursor-pointer"
            onClick={handleFormSwitch}
          >
            Faça login
          </span>
        </div>
      </>
    );
  }

  function handleFormSwitch() {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  }

  return (
    <main className="w-full min-h-screen bg-[url('./src/assets/rainbow-vortex.svg')] bg-no-repeat bg-cover text-white flex flex-col">
      <div className="flex flex-1">
        <aside className="w-2/5 bg-black">oi</aside>
        <aside className="w-3/5 bg-slate-200 border-l-2 border-l-white bg-opacity-30 flex justify-center items-center">
          <div className="w-8/12 h-5/6 rounded-lg bg-slate-300 shadow-xl text-center">
            <h1 className="font-roboto-bold text-4xl my-10">
              {isLogin ? "LOGIN" : "CADASTRO"}
            </h1>
            <p className="font-roboto-medium text-black text-justify mx-10 -my-5 text-xl">
              Bem vindo a livraria Encanto! Explore um novo mundo recheado de
              histórias!
            </p>

            {isLogin ? LoginForm() : SingupForm()}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default LoginUser;
