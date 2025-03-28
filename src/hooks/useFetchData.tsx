import { useState, useEffect } from "react";

interface Item {
  email: string;
  endereco: string;
  mantenedora: string;
  cnpj: string;
  estado: string;
  cidade: string;
}

const useFetchData = (url: string) => {
  const [data, setData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);

        const parsedData: Item[] = Object.values(result.CVV).map((item: any) => ({
          email: item.email || item["E-mail:"],
          endereco: item.endereco,
          mantenedora: item.mantenedora,
          cnpj: item.cnpj,
          estado: item.estado,
          cidade: item.cidade,
        }));
        
        setData(parsedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
