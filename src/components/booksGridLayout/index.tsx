"use client";
import { Livro } from '@/hooks/useFetchBookData';

type GridLayoutProps = {
  items: Livro[];
  onBookClick: (livro: Livro) => void;
  downloadIcon?: boolean;
};

export default function GridLayout({ items, onBookClick, downloadIcon }: GridLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
        {items.map((livro, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-[300px]"
            onClick={() => onBookClick(livro)}
          >
            <div className="relative w-full h-48 flex items-center justify-center mb-4">
              {downloadIcon && (
                <button
                  className="absolute -top-5 -left-10 z-30 m-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a href={livro.link_download} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                      className="bi bi-file-earmark-arrow-down-fill text-primary" viewBox="0 0 16 16">
                      <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1m-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0" />
                    </svg>
                  </a>
                </button>
              )}
              <img
                src={
                  !livro.imagem_capa || livro.imagem_capa === "null"
                    ? "/icons/book-half.svg"
                    : livro.imagem_capa
                }
                alt={livro.titulo}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">{livro.titulo}</h3>
            {livro.sentimentos && (
              <p className="text-sm text-gray-500">{livro.sentimentos.join(", ")}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
