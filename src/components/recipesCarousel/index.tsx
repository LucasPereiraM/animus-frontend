import { useState } from 'react';
import Image from 'next/image';
import { Receita } from '@/hooks/useFetchRecipeData';

type CarouselProps = {
  items: Receita[];
  onRecipeClick: (receita: Receita) => void;
};

export default function RecipesCarousel({ items, onRecipeClick }: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  const goLeft = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goRight = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const getVisibleItems = () => {
    return [0, 1, 2].map((i) => items[(startIndex + i) % items.length]);
  };

  if (!items || items.length === 0) {
    return <p className="text-center mt-10">Nenhum livro encontrado.</p>;
  }

  return (
    <div className="flex items-center justify-center relative z-10 bg-white">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={goLeft}
          className="absolute -left-40 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
        >
          <Image
            src="/icons/arrow-left.svg"
            alt="navegar para esquerda"
            width={24}
            height={24}
          />
        </button>

        <div className="flex justify-center space-x-4 p-4 gap-10">
          {getVisibleItems().map((livro, index) => (
            <div
              key={`${livro.nome_receita}-${(startIndex + index) % items.length}`}
              className={`flex-shrink-0 w-1/3 ${index === 1 ? 'scale-110' : 'scale-100'} transition-transform relative`}
            >
              <div 
                className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col relative h-[400px] justify-between cursor-pointer"
                onClick={() => onRecipeClick(livro)}
              >
                <div className="w-full h-48 flex items-center justify-center">
                  <img
                    src={
                      !livro.foto_receita || livro.foto_receita === "null"
                        ? "/icons/book-half.svg"
                        : livro.foto_receita
                    }
                    alt={livro.nome_receita}
                    className="max-w-full max-h-full object-contain rounded-t-lg"
                    loading="lazy"
                  />
                </div>

                <div className="text-center w-full mt-6">
                  <h3 className="text-lg font-normal text-primary">{livro.nome_receita}</h3>
                  {livro.sentimento && (
                    <p className="text-sm text-gray-600">{livro.sentimento}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goRight}
          className="absolute -right-40 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
        >
          <Image
            src="/icons/arrow-right.svg"
            alt="navegar para direita"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
