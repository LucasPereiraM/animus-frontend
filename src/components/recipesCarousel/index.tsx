import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Receita } from '@/hooks/useFetchRecipeData';

type CarouselProps = {
  items: Receita[];
  onRecipeClick: (receita: Receita) => void;
};

export default function RecipesCarousel({ items, onRecipeClick }: CarouselProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const goLeft = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const goRight = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const getVisibleItems = () => {
    if (items.length <= visibleCount) {
      return items;
    }
    return Array.from({ length: visibleCount }, (_, i) => items[(startIndex + i) % items.length]);
  };

  if (!items || items.length === 0) {
    return <p className="text-center mt-10">Nenhuma receita encontrada.</p>;
  }

  const actualVisibleCount = Math.min(visibleCount, items.length);

  return (
    <div className="flex items-center justify-center relative z-10 bg-white">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={goLeft}
          className="absolute xl:-left-40 lg:-left-14 md:-left-5 -left-1 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
        >
          <Image src="/icons/arrow-left.svg" alt="navegar para esquerda" width={24} height={24} />
        </button>

        <div className="flex justify-center items-stretch gap-6 px-4 py-6">
          {getVisibleItems().map((livro, index) => {
            const isHighlighted = visibleCount === 3 && index === 1;

            let widthClass = 'w-full';
            if (actualVisibleCount === 2) {
              widthClass = 'w-1/2';
            } else if (actualVisibleCount >= 3) {
              widthClass = 'w-1/3';
            }

            return (
              <div
                key={`${livro.nome_receita}-${index}`}
                className={`flex-shrink-0 ${widthClass} transform-gpu transition-transform duration-300 ${
                  isHighlighted ? 'scale-110' : 'scale-100'
                }`}
              >
                <div
                  className="bg-white h-[340px] p-6 rounded-lg shadow-md text-center flex flex-col justify-between cursor-pointer"
                  onClick={() => onRecipeClick(livro)}
                >
                  <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-t-lg">
                    <img
                      src={
                        !livro.foto_receita || livro.foto_receita === 'null'
                          ? '/icons/book-half.svg'
                          : livro.foto_receita
                      }
                      alt={livro.nome_receita}
                      className="w-full h-full object-cover"
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
            );
          })}
        </div>

        <button
          onClick={goRight}
          className="absolute xl:-right-40 lg:-right-14 md:-right-5 -right-1 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-20"
        >
          <Image src="/icons/arrow-right.svg" alt="navegar para direita" width={24} height={24} />
        </button>
      </div>
    </div>
  );
}
