function Footer(){
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Livraria Encanto</h2>
            <p className="mt-2">Endereço: Rua dos Livros, 123, Centro - SP</p>
            <p className="mt-1">Telefone: (11) 98765-4321</p>
            <p className="mt-1">Email: contato@livrariaencanto.com.br</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">&copy; {new Date().getFullYear()} Livraria Encanto. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer