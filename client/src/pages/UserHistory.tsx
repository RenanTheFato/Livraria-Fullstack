function UserHistory(){
  return(
    <main className="w-full h-full overflow-hidden">
      <h1 className="font-roboto font-bold text-3xl m-10 underline decoration-cyan-400">Histórico de Compras</h1>
      <div className="flex flex-center my-56 justify-center items-center">
        <span className="font-roboto text-2xl">Você ainda não realizou nenhuma compra.</span>
      </div>
    </main>
  );
}

export default UserHistory