"use client";
import { Livro } from '@/hooks/useFetchBookData';

type GridLayoutProps = {
  items: Livro[];
  onBookClick: (livro: Livro) => void;
};

export default function GridLayout({ items, onBookClick }: GridLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
        {items.map((livro, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-[300px]"
            onClick={() => onBookClick(livro)}
          >
            <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4">
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
