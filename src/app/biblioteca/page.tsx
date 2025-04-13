"use client";
import Carousel from "@/components/carousel";
import InputField from "@/components/inputField";
import { useState, useEffect } from "react";
import useFetchBookData from "@/hooks/useFetchBookData";

export default function Biblioteca() {
    const { data, loading, error, fetchData } = useFetchBookData();
    const [searchValue, setSearchValue] = useState("");
    const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchData("https://maoamiga.up.railway.app/get_in_general_book");
    }, []);

    return (
        <div>
            <InputField
                emotions={false}
                inputWidth="w-[600px]"
                width="w-[600px]"
                marginLeft="ml-[650px]"
                marginTop="mt-10"
                placeholder="Pesquise um livro..."
                sendButton={true}
                value={searchValue}
                onChange={setSearchValue}
            />

            <div className="flex flex-col ml-[350px] mt-20 mb-10">
                <h2 className="text-4xl text-gray-600">Escolha um livro</h2>
                <p className="text-lg">Clique no livro para abrir a exibição, baixe ou busque um livro...</p>
            </div>

            {loading && <p className="text-center mt-10">Carregando...</p>}
            {error && <p className="text-center mt-10 text-red-500">{error}</p>}
            {!loading && !error && data.length > 0 && (
                <div>
                    <Carousel items={data} onBookClick={(url) => setSelectedPdfUrl(url)} />
                    {selectedPdfUrl && (
                        <div className="flex justify-center mt-20 mb-20">
                            <iframe
                                src={selectedPdfUrl}
                                width="80%"
                                height="900px"
                                className="border rounded shadow-lg"
                            ></iframe>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}
