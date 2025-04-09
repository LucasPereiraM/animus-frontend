import { useState } from "react";

export interface Item {
  nomeMedico: string;
  especialidade: string;
  crm: string;
  uf: string;
  endereco: string;
  telefone: string;
}

interface FetchParams {
  nome: string;
  estado: string;
  crm: string;
}

interface RawItem {
  Nome: string;
  Especialidade: string;
  CRM: string;
  Estado: string;
  Endereço: string;
  Telefone: string;
}

const useFetchCfmData = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, inputData: FetchParams) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
      });

      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }

      const result: Record<string, RawItem> = await res.json();

      const parsedData: Item[] = Object.values(result).map((item) => ({
        nomeMedico: item.Nome,
        especialidade: item.Especialidade,
        crm: item.CRM,
        uf: item.Estado,
        endereco: item.Endereço,
        telefone: item.Telefone,
      }));
      setData(parsedData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchCfmData;
