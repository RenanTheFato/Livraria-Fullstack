import { useState, useRef, FormEvent, useEffect } from "react";
import { api } from "../service/api";

function LoginPublisher() {
  const [isLogin, setIsLogin] = useState(true);
  const [cnpj, setCnpj] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const cnpjRef = useRef<HTMLInputElement | null>(null)
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const message = localStorage.getItem("signupSuccessMessage");
    if (message) {
      setSuccessMessage(message);
      localStorage.removeItem("signupSuccessMessage");
    }
  }, []);

  async function handleCreateAccount(event: FormEvent) {
    event.preventDefault();

    setError({});

    let hasError = false;

    if (!cnpjRef.current?.value) {
      hasError = true;
    }

    if (!nameRef.current?.value) {
      hasError = true;
    }
    if (!emailRef.current?.value) {
      hasError = true;
    }
    if (!passRef.current?.value) {
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await api.post("/create-publisher", {
        CNPJ: cnpjRef.current?.value,
        nome: nameRef.current?.value,
        email: emailRef.current?.value,
        senha: passRef.current?.value,
      });

      if (res.status === 200) {
        localStorage.setItem(
          "signupSuccessMessage",
          "Conta criada com sucesso! Faça login agora."
        );
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setError({
        form: "Erro ao criar conta. Verifique as informações e tente novamente.",
      });
    }
  }

  async function handleLoginAccount(event: FormEvent) {
    event.preventDefault();

    setError({});

    try {
      const res = await api.post("/login-publisher", {
        CNPJ: cnpjRef.current?.value,
        email: emailRef.current?.value,
        senha: passRef.current?.value,
      });

      if (res.status === 200) {
        const { token } = res.data.publisher;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userType", "publisher");
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      setError({
        form: "Erro ao fazer login. Verifique as credenciais e tente novamente.",
      });
    }
  }
  function LoginForm() {
    return (
      <>
        <form className="flex flex-col w-full px-10 my-16 space-y-8" onSubmit={handleLoginAccount}>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ''))}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200 "
            placeholder="Insira seu CNPJ..."
            ref={cnpjRef}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200 "
            placeholder="Insira seu email..."
            ref={emailRef}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200 "
            placeholder="Insira sua senha..."
            ref={passRef}
          />
          <input
            type="submit"
            className="bg-amber-900 p-2 rounded font-bold font-roboto-bold text-sm cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-amber-900 hover:to-amber-700 hover:scale-105 hover:transition-all"
            value="ENTRAR"
          />
        </form>

        <div className="flex flex-row w-full relative">
          {successMessage && (
            <p className="text-green-600 text-lg font-roboto-bold font-bold absolute w-full -my-10">
              {successMessage}
            </p>
          )}
          {error.form && <p className="text-red-500 absolute w-full -my-10">{error.form}</p>}
          <span className="text-black text-lg absolute mx-10">
            Não tem um cadastro?
          </span>
          <span
            className="text-amber-900 text-lg absolute right-0 mx-10 cursor-pointer"
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
        <form
          className="flex flex-col w-full px-10 my-10 space-y-4"
          onSubmit={handleCreateAccount}
        >
           <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ''))}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200"
            placeholder="Insira seu CNPJ..."
            ref={cnpjRef}
          />

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200"
            placeholder="Insira o nome da editora..."
            ref={nameRef}
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200"
            placeholder="Insira seu email..."
            ref={emailRef}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 font-roboto rounded outline-none shadow-lg text-black focus:placeholder:text-black focus:shadow-amber-200 focus:outline-1 focus:outline-amber-200"
            placeholder="Crie uma senha..."
            ref={passRef}
          />

          <input
            type="submit"
            className="bg-amber-900 p-2 rounded font-bold font-roboto-bold text-sm cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-amber-900 hover:to-amber-700 hover:scale-105 hover:transition-all"
            value="CADASTRAR"
          />
          {error.form && <p className="text-red-500">{error.form}</p>}
        </form>
        <div className="flex flex-row w-full relative -my-5">
          <span className="text-black text-lg absolute mx-10">
            Já tem uma conta?
          </span>
          <span
            className="text-amber-900 text-lg absolute right-0 mx-10 cursor-pointer"
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
    setCnpj("");
    setEmail("");
    setPassword("");
    setName("");
    setError({});
  }

  return (
    <main className="w-full min-h-screen bg-[url('./src/assets/Icon-Grid.svg')] bg-no-repeat bg-cover text-white flex flex-col">
      <div className="flex flex-1">
        <aside className="w-2/5 bg-black bg-[url('./src/assets/loginPublisher.jfif')] bg-no-repeat bg-cover">
        </aside>
        <aside className="w-3/5 bg-black border-l-2 border-l-white bg-opacity-60 flex justify-center items-center">
          <div className="w-8/12 h-5/6 rounded-lg bg-slate-300 shadow-xl text-center">
            <h1 className="font-roboto-bold text-4xl my-6">
              {isLogin ? "LOGIN" : "CADASTRO"}
            </h1>
            <p className="font-roboto-medium text-black text-justify mx-10 -my-5 text-lg">
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

export default LoginPublisher;