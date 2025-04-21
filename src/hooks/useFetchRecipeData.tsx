import { useState } from "react";

export type Receita = {
  foto_receita: string;
  ingredientes: string[];
  preparo: string[];
  sentimento: string;
  nome_receita: string;
  data: string;
};

const useFetchReceitaData = () => {
  const [data, setData] = useState<{ id: string; receita: Receita }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (url: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.status}`);
      }

      const result: Record<string, Receita> = await res.json();

      const parsedData = Object.entries(result).map(([id, receita]) => ({
        id,
        receita,
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

export default useFetchReceitaData;
