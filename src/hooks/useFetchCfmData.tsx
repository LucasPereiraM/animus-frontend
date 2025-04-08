import { useState } from "react";

export interface Item {
  nomeMedico: string;
  especialidade: string;
  crm: string;
  uf: string;
  endereco: string;
  telefone: string;
}

const useFetchCfmData = () => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string, inputData: any) => {
    setLoading(true);
    setError(null);

    console.log("📤 Dados que vão no POST:", inputData);

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

      const result = await res.json();

      const parsedData: Item[] = Object.values(result).map((item: any) => ({
        nomeMedico: item.Nome,
        especialidade: item.Especialidade,
        crm: item.CRM,
        uf: item.Estado,
        endereco: item.Endereço,
        telefone: item.Telefone,
      }));
      setData(parsedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetchCfmData;
