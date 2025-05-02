import { useState } from "react";

export type Video = {
    title: string;
    channel: string;
    thumbnail: string;
    embed: string;
};

export type FetchParams = {
    feeling: string;
}

const useFetchVideoData = () => {
    const [data, setData] = useState<Video[]>([]);
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

            const responseData = await res.json();
            console.log("Resposta da API:", responseData);
            setData(responseData);

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

export default useFetchVideoData;