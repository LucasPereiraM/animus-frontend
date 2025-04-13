import { useState } from "react";

export type Livro = {
    descricao: string;
    imagem_capa: string;
    link_download: string;
    sentimentos: (string | null)[];
    titulo: string;
};

const useFetchBookData = () => {
    const [data, setData] = useState<{ id: string, livro: Livro }[]>([]);
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

            const result: Record<string, Livro> = await res.json();

            const parsedData = Object.entries(result).map(([id, livro]) => ({
                id,
                livro,
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

export default useFetchBookData;
