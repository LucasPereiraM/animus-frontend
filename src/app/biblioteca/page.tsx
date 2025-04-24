"use client";
import BooksCarousel from "@/components/booksCarousel";
import InputField from "@/components/inputField";
import { useState, useEffect, useRef } from "react";
import useFetchBookData, { Livro } from "@/hooks/useFetchBookData";
import GridLayout from "@/components/booksGridLayout";

export default function Biblioteca() {
  const { data, loading, error, fetchData } = useFetchBookData();
  const [searchValue, setSearchValue] = useState("");
  const [selectedBook, setSelectedBook] = useState<Livro | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const bookDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData("https://maoamiga.up.railway.app/get_in_general_book");
  }, []);

  const handleBookClick = (book: Livro) => {
    setSelectedBook(book);

    if (bookDetailsRef.current) {
      bookDetailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center items-center">
        <InputField
          emotions={true}
          inputWidth="w-[1000px]"
          width="w-full"
          marginLeft=""
          marginTop="mt-10"
          placeholder="Pesquise um livro..."
          sendButton={true}
          value={searchValue}
          onChange={setSearchValue}
        />
      </div>
      <div className="flex flex-col mt-20 mb-10">
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
              {viewMode === "grid" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-collection-fill" viewBox="0 0 16 16">
                  <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3m2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x2-gap-fill" viewBox="0 0 16 16">
                  <path d="M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                </svg>
              )}
            </button>
          </div>

          {viewMode === "grid" ? (
            <div className="h-[800px] overflow-y-auto mx-auto w-fit mb-20">
              <GridLayout items={data.map(item => item.livro)} onBookClick={handleBookClick} />
            </div>
          ) : (
            <BooksCarousel items={data.map(item => item.livro)} onBookClick={handleBookClick} downloadIcon />
          )}

          {selectedBook && (
            <div ref={bookDetailsRef} className="flex justify-center mt-20 mb-20 flex-col items-center">
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
