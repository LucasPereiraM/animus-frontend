import { useState } from "react";

export interface Item {
    user_message: string;
    bot_reply: string;
    feeling: string;
    timestamp: string;
}

interface FetchParams {
    message: string;
}

interface RawItem {
    user_message: string;
    bot_reply: string;
    feeling: string;
    timestamp: string;
}

const useFetchPhraseData = () => {
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

            const result: { response: RawItem } = await res.json();

            const parsedData: Item[] = [result.response];
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

export default useFetchPhraseData;
