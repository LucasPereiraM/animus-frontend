import { useState, useEffect } from "react";

interface Cidade {
  id: string;
  nome: string;
}

interface Estado {
  sigla: string;
  nome: string;
}

interface ItemCVV {
  estado: string;
  cidade: string;
}

const fetchDados = async (): Promise<Record<string, ItemCVV>> => {
  const response = await fetch("https://maoamiga.up.railway.app/get_in_general_cvv");
  const data = await response.json();
  return data;
};

const SelectStateCity: React.FC = () => {
  const [dados, setDados] = useState<Record<string, ItemCVV>>({});
  const [estados, setEstados] = useState<Estado[]>([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

  useEffect(() => {
    // Busca os dados da API
    fetchDados().then((res) => {
      setDados(res);
      console.log(res);
  
      if (res.CVV) {
        const estadosUnicos = Array.from(
          new Set(Object.values(res.CVV).map((item) => item.estado).filter(Boolean))
        ).map((sigla) => ({ sigla, nome: sigla }));
  
        setEstados(estadosUnicos);
        console.log(estadosUnicos);
      }
    });
  }, []);

  useEffect(() => {
    if (estadoSelecionado) {
      const cidadesFiltradas = Object.entries(dados.CVV || {})
        .filter(([_, item]) => item.estado === estadoSelecionado)
        .map(([id, item]) => ({ id, nome: item.cidade }));
  
      setCidades(cidadesFiltradas);
      setCidadeSelecionada("");
    }
  }, [estadoSelecionado, dados]);
  
  return (
    <div className="p-4 space-y-4">
    <label className="block">
      <span className="text-gray-700">Estado</span>
      <select
      value={estadoSelecionado}
      onChange={(e) => setEstadoSelecionado(e.target.value)}
      className="block w-full mt-1 p-2 border rounded"
    >
      <option value="">Selecione um estado</option>
      {estados.map((estado) => (
        <option key={estado.sigla} value={estado.sigla}>
          {estado.nome}
        </option>
      ))}
    </select>

    </label>

      <label className="block">
        <span className="text-gray-700">Cidade</span>
        <select
          value={cidadeSelecionada}
          onChange={(e) => setCidadeSelecionada(e.target.value)}
          disabled={!estadoSelecionado}
          className="block w-full mt-1 p-2 border rounded disabled:bg-gray-200"
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map((cidade) => (
            <option key={cidade.id} value={cidade.nome}>
              {cidade.nome}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectStateCity;
