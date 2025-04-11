import { useState } from "react";

type Livro = {
    descricao: string;
    imagem_capa: string;
    link_download: string;
    sentimentos: (string | null)[];
    titulo: string;
};

type LivrosResponse = {
    [id: string]: Livro;
};

const useFetchBookData = () => {
    const [data, setData] = useState<Livro[]>([]);
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

            const parsedData: Livro[] = Object.values(result).map((item) => ({
                descricao: item.descricao,
                imagem_capa: item.imagem_capa,
                link_download: item.link_download,
                sentimentos: item.sentimentos,
                titulo: item.titulo
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
