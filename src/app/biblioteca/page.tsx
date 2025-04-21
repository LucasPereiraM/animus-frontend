"use client";
import BooksCarousel from "@/components/booksCarousel";
import InputField from "@/components/inputField";
import { useState, useEffect } from "react";
import useFetchBookData, { Livro } from "@/hooks/useFetchBookData";
import GridLayout from "@/components/booksGridLayout";

export default function Biblioteca() {
    const { data, loading, error, fetchData } = useFetchBookData();
    const [searchValue, setSearchValue] = useState("");
    const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

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
                <>
                    <div className="flex justify-center my-6">
                        <button
                            onClick={() => setViewMode(viewMode === "grid" ? "carousel" : "grid")}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Alternar para {viewMode === "grid" ? "Carrossel" : "Grade"}
                        </button>
                    </div>

                    {viewMode === "grid" ? (
                        <div className="h-[600px] overflow-y-auto mx-auto w-fit">
                            <GridLayout items={data.map(item => item.livro)} onBookClick={setSelectedBook} />
                        </div>
                    ) : (
                        <BooksCarousel items={data.map(item => item.livro)} onBookClick={setSelectedBook} downloadIcon />
                    )}

                    {selectedBook && (
                        <div className="flex justify-center mt-20 mb-20 flex-col items-center">
                            <h3 className="text-3xl text-primary mb-4 w-[500px] text-center">
                                {selectedBook.titulo}
                            </h3>
                            {selectedBook.sentimentos && (
                                <p className="text-gray-600 mb-4">{selectedBook.sentimentos.join(", ")}</p>
                            )}
                            {selectedBook.imagem_capa && (
                                <div className="w-full flex justify-center">
                                    <img
                                        src={selectedBook.imagem_capa}
                                        alt={`Capa do livro ${selectedBook.titulo}`}
                                        className="max-w-xs md:max-w-md lg:max-w-lg max-h-[500px] object-contain rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            {selectedBook.descricao && (
                                <p className="w-[500px] mt-10 m-10 text-wrap text-center">
                                    {selectedBook.descricao}
                                </p>
                            )}
                            {selectedBook.link_download && (
                                <a
                                    href={selectedBook.link_download}
                                    target="_blank"
                                    className="mb-4 text-primary hover:underline"
                                >
                                    Baixar PDF
                                </a>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
