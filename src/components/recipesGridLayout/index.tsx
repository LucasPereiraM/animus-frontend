"use client";
import { Receita } from '@/hooks/useFetchRecipeData';
import Image from 'next/image';

type GridLayoutProps = {
  items: Receita[];
  onRecipeClick: (receita: Receita) => void;
};

export default function RecipesGridLayout({ items, onRecipeClick }: GridLayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {items.map((receita, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-[300px]"
            onClick={() => onRecipeClick(receita)}
          >
            <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4">
              <Image
                src={
                  !receita.foto_receita || receita.foto_receita === "null"
                    ? "/icons/book-half.svg"
                    : receita.foto_receita
                }
                alt={receita.nome_receita}
                width={500}
                height={500}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-primary mb-2">{receita.nome_receita}</h3>
            {receita.sentimento && (
              <p className="text-sm text-gray-500">{receita.sentimento}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
