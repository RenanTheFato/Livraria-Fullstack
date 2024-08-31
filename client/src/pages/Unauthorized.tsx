function Unauthorized(){
  return(
    <main className="w-full min-h-screen bg-slate-300 flex flex-col justify-center items-center">
      <h1 className="font-roboto font-bold text-[16rem] text-slate-400 font-outline-4 ">401</h1>
      <div className="flex flex-row space-x-10">
        <h1 className="text-red-600 text-5xl">ERROR</h1><h1 className="text-5xl">Unauthorized</h1>
      </div>
    </main>
  );
}

export default Unauthorized