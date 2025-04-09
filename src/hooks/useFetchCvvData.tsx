import { useState, useEffect } from "react";

export interface Item {
  email: string;
  endereco: string;
  mantenedora: string;
  cnpj: string;
  estado: string;
  cidade: string;
}

interface RawItem {
  email?: string;
  "E-mail:"?: string;
  endereco: string;
  mantenedora: string;
  cnpj: string;
  estado: string;
  cidade: string;
}

const useFetchCvvData = (url: string) => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const result: Record<string, RawItem> = await response.json();

        const parsedData: Item[] = Object.values(result).map((item): Item => ({
          email: item.email || item["E-mail:"] || "",
          endereco: item.endereco,
          mantenedora: item.mantenedora,
          cnpj: item.cnpj,
          estado: item.estado,
          cidade: item.cidade,
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

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchCvvData;
