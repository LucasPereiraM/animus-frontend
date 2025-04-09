"use client"
import InputField from "@/components/inputField";
import Carousel from "@/components/carousel";
import { useState } from "react";

interface Item {
    id: number;
    title: string;
    subtitle?: string;
    img: string;
}

const items: Item[] = [
    { id: 1, title: 'Chá de Camomila com Mel', subtitle: "emoção 1", img: '/image 4.svg' },
    { id: 2, title: 'Chá de Hortelã', subtitle: "emoção 2", img: '/image 5.svg' },
    { id: 3, title: 'Sopa de Legumes', subtitle: "emoção 3", img: '/image 6.svg' },
    { id: 4, title: 'Saúde Mental e Atenção Psicosocial', subtitle: "emoção 4", img: '/receita4.jpg' },
];


export default function Receitas() {
    const [inputValue,setInputValue] = useState('');

    return (
        <div className="flex flex-row gap-24 justify-center">
            <div className="-mt-12">
                <InputField emotions={true} width="w-[1200px]" inputWidth="w-[1150px]" placeholder="Estou me sentindo triste..." sendButton={true} marginTop="mt-32" value={inputValue} onChange={setInputValue} />
                <div className="-mt-14">
                    <Carousel items={items} />
                </div>
            </div>

        </div>
    );
}
