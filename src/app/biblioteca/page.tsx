"use client"
import Carousel from "@/components/carousel";
import InputField from "@/components/inputField";
import { useState } from "react";
import useFetchBookData from "@/hooks/useFetchBookData";
import { useEffect } from "react";

interface Item {
    id: number;
    title: string;
    subtitle?: string;
    img: string;
}

const items: Item[] = [
    { id: 1, title: 'Saúde Mental e Espiritualidade', subtitle: 'Arival Dias Casimiro e Marcionilo Laranjeiras', img: '/livro1.png' },
    { id: 2, title: 'Saúde Mental e Inteligência Emocional', subtitle: 'Jorge Luis', img: '/livro2.png' },
    { id: 3, title: 'Saúde Emocional', subtitle: 'Maycon Assunção', img: '/livro3.png' },
    { id: 4, title: 'Saúde Mental e Atenção Psicosocial', subtitle: 'Paulo Amarante', img: '/livro4.webp' },
];

export default function Biblioteca() {

    const { data, loading, error, fetchData } = useFetchBookData();

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        fetchData("https://maoamiga.up.railway.app/get_in_general_book");
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            console.log("Dados recebidos da API:", data);
        }
    }, [data]);

    return (
        <div>
            <InputField emotions={false} inputWidth="w-[600px]" width="w-[600px]" marginLeft="ml-[650px]" marginTop="mt-10" placeholder="Pesquise um livro..." sendButton={true} value={searchValue} onChange={setSearchValue} />
            <div className="">
                <Carousel items={items} />
            </div>

        </div>
    );
}
