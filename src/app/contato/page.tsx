"use client"
import { useState } from "react";
import SelectStateCity from "@/components/selectStateCity";
import ActionButton from "@/components/button";
import Table from "@/components/table";
import Profissionais from "@/app/profissionais/page";
import Map from "@/components/map";

const SwitchToMap = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row rounded-md shadow-md p-5 gap-5 hover:bg-slate-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-geo-alt-fill text-primary" viewBox="0 0 16 16">
        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
      </svg>
      <p className="text-xl text-center text-black">Médicos na área</p>
    </button>
  );
};

export default function Contato() {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");
  const [janelaAtual, setJanelaAtual] = useState<"cvv" | "profissionais" | "mapa">("cvv");

  return (
    <div className="flex flex-col justify-center px-40">
      <div className="flex flex-row mt-20 mb-10 gap-12 justify-center items-center">
        <ActionButton
          image="/icons/cvvIcon.svg"
          name="CVV"
          alt="Abrir janela de centros de valorização a vida."
          imgWidth={40}
          imgHeight={40}
          onClick={() => setJanelaAtual("cvv")}
        />
        <ActionButton
          image="/icons/medico.svg"
          name="Profissionais"
          alt="Abrir janela de profissionais."
          imgWidth={40}
          imgHeight={40}
          onClick={() => setJanelaAtual("profissionais")}
        />
      </div>

      <div className="flex justify-center">
        <SwitchToMap onClick={() => setJanelaAtual("mapa")} />
      </div>

      {janelaAtual === "cvv" && (
        <>
          <SelectStateCity
            estadoSelecionado={estadoSelecionado}
            setEstadoSelecionado={setEstadoSelecionado}
            cidadeSelecionada={cidadeSelecionada}
            setCidadeSelecionada={setCidadeSelecionada}
          />
          <div className="mb-20">
            <Table estadoSelecionado={estadoSelecionado} cidadeSelecionada={cidadeSelecionada} />
          </div>
        </>
      )}

      {janelaAtual === "profissionais" && <Profissionais />}
      {janelaAtual === "mapa" && <Map apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY  || ''} />
    }
    </div>
  );
}
