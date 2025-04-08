"use client"
import Map from "@/components/map";

const Profissionais = () => {
  return (
    <>
      <header className="bg-[#2679bd] text-white py-2 text-center text-2xl">
        Mão Amiga
      </header>
      <div className="flex h-[calc(100vh-56px)]">
        <nav className="bg-[#333] text-white w-[200px] p-4 flex flex-col">
          <button
            className="bg-[#2679bd] border-none text-white p-2 my-1 text-left cursor-pointer"
            onClick={() => (window.location.href = "home.html")}
          >
            Home
          </button>
          <button
            className="bg-[#2679bd] border-none text-white p-2 my-1 text-left cursor-pointer"
            onClick={() => (window.location.href = "sobre.html")}
          >
            Sobre
          </button>
          <button
            className="bg-[#2679bd] border-none text-white p-2 my-1 text-left cursor-pointer"
            onClick={() => (window.location.href = "contato.html")}
          >
            Contato
          </button>
        </nav>
        <main className="flex-1 p-5 bg-[#f4f4f4] overflow-y-auto">
          <h1 className="text-xl mb-2">
            &#128204;Profissionais Próximo de Você&#128204;
          </h1>
          <p>
            Aqui você pode buscar psicólogos próximos à sua localização. Utilize o mapa abaixo para encontrar profissionais na sua área.
          </p>
          <div className="mt-10">
            <Map apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} />
          </div>
        </main>
      </div>
    </>
  );
};

export default Profissionais;
