import { useState, useRef, FormEvent, useEffect } from "react";
import { api } from "../service/api";

function CreateBookForm() {
  const tituloRef = useRef<HTMLInputElement | null>(null);
  const descricaoRef = useRef<HTMLInputElement | null>(null);
  const autorRef = useRef<HTMLInputElement | null>(null);
  const categoriaRef = useRef<HTMLSelectElement | null>(null);
  const classificacaoRef = useRef<HTMLSelectElement | null>(null);
  const paginasRef = useRef<HTMLInputElement | null>(null);
  const editoraRef = useRef<HTMLInputElement | null>(null);
  const anoPubRef = useRef<HTMLInputElement | null>(null);
  const precoRef = useRef<HTMLInputElement | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const [bookId, setBookId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showImageForm, setShowImageForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [precoError, setPrecoError] = useState('');


  const handlePrecoChange = () => {
    if (precoRef.current) {
      const value = precoRef.current.value;
      if (!/^\d*\.?\d*$/.test(value)) {
        setPrecoError('Valor inválido. Apenas números e o caractere "." são permitidos.');
      } else if (parseFloat(value) < 0) {
        setPrecoError('O valor não pode ser abaixo de 0.');
      } else {
        setPrecoError('');
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (redirecting) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            window.location.href = "/";
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [redirecting, history]);

  const handleBookSubmit = async (event: FormEvent) => {
    event.preventDefault();

    
    const titulo = tituloRef.current?.value || "";
    const descricao = descricaoRef.current?.value || "";
    const autor = autorRef.current?.value || "";
    const categoria = categoriaRef.current?.value || "";
    const classificacao = classificacaoRef.current?.value || "";
    const paginas = parseInt(paginasRef.current?.value || "0", 10);
    const editora = editoraRef.current?.value || "";
    const ano_pub = parseInt(anoPubRef.current?.value || "0", 10);
    const preco = parseFloat(precoRef.current?.value || "0");

    if (preco < 0) {
      setPrecoError('O valor não pode ser abaixo de 0.');
      return;
    }

    try {
      const res = await api.post("/insert-book", {
        titulo,
        descricao,
        autor,
        categoria,
        classificacao,
        paginas,
        editora,
        ano_pub,
        preco,
      });

      setBookId(res.data.id);
      setSuccessMessage(
        "Livro criado com sucesso! Agora faça o upload da imagem."
      );
      setError("");
      setShowImageForm(true);
    } catch (err) {
      console.error("Erro ao criar o livro:", err);
      setError("Erro ao criar o livro.");
      setSuccessMessage("");
    }
  };

  const handleImageSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!bookId || !imageRef.current?.files?.[0]) {
      setError("ID do livro ou imagem ausente.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", imageRef.current.files[0]);

      await api.post(`/upload-book-image/${bookId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("Imagem enviada com sucesso!");
      setError("");
      setRedirecting(true);
    } catch (err) {
      setError("Erro ao enviar a imagem.");
    }
  };

  const handleImageChange = () => {
    if (imageRef.current?.files?.[0]) {
      const file = imageRef.current.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {precoError && <p className="text-red-500 mb-4">{precoError}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        {!showImageForm && (
          <form onSubmit={handleBookSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700">Título</label>
                <input
                  type="text"
                  placeholder="Título"
                  ref={tituloRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Descrição</label>
                <input
                  type="text"
                  placeholder="Descrição"
                  ref={descricaoRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Autor</label>
                <input
                  type="text"
                  placeholder="Autor"
                  ref={autorRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Categoria</label>
                <select
                  ref={categoriaRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione a Categoria</option>
                  <option value="Ação">Ação</option>
                  <option value="Aventura">Aventura</option>
                  <option value="Biografia">Biografia</option>
                  <option value="Drama">Drama</option>
                  <option value="Esportivo">Esportivo</option>
                  <option value="Fantasia">Fantasia</option>
                  <option value="Ficção">Ficção</option>
                  <option value="Gibi">Gibi</option>
                  <option value="Infantil">Infantil</option>
                  <option value="Mistério">Mistério</option>
                  <option value="Terror">Terror</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Classificação</label>
                <select
                  ref={classificacaoRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Selecione a Classificação Indicatica</option>
                  <option value="L">Livre</option>
                  <option value="10">10+</option>
                  <option value="12">12+</option>
                  <option value="14">14+</option>
                  <option value="16">16+</option>
                  <option value="18">18+</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Páginas</label>
                <input
                  type="number"
                  placeholder="Páginas"
                  ref={paginasRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Editora</label>
                <input
                  type="text"
                  placeholder="Editora"
                  ref={editoraRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Ano de Publicação</label>
                <input
                  type="number"
                  placeholder="Ano de Publicação"
                  ref={anoPubRef}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">Preço</label>
                <input
                  type="text"
                  placeholder="Preço"
                  ref={precoRef}
                  onChange={handlePrecoChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 mt-4 bg-blue-500 text-white rounded-md"
            >
              Enviar Informações
            </button>
          </form>
        )}

        {showImageForm && (
          <form
            onSubmit={handleImageSubmit}
            className="mt-6 flex items-center space-x-4"
          >
            {imagePreview && (
              <div className="flex items-center space-x-4">
                <img
                  src={imagePreview}
                  alt="Preview da Imagem"
                  className="w-32 h-auto border border-gray-300 rounded-md"
                />
              </div>
            )}
            <div className="flex-1">
              <label className="block text-gray-700">Imagem</label>
              <input
                type="file"
                ref={imageRef}
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="p-2 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Enviar Imagem
            </button>
          </form>
        )}

        {redirecting && (
          <div className="mt-6 text-center">
            <p>Redirecionando em {secondsLeft} segundos...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateBookForm;
